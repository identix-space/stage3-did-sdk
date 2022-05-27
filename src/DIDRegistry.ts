import {TonClient} from '@tonclient/core';
import {Account} from '@tonclient/appkit';
import {DIDRegistryABI} from './DIDRegistryABI';
import {KeyPair} from '@tonclient/core/dist/modules';
import {BinaryLibrary} from '@tonclient/core/dist/bin';
import {ZERO_ADDRESS} from './constants';

/**
 * Issue new DID input params
 */
export interface IssueDidDocumentParams {
    /** DID Document content */
    content: string;
    /** DID Document owner public key, must be provided only one of public key or address, not both */
    docOwnerPubKey?: string;
    /** DID Document owner address, must be provided only one of public key or address, not both */
    docOwnerAddress?: string;
    /** DID Registry owner keys */
    controllerKeys: KeyPair;
    /** Initial balance of DID Document */
    initialDocBalance: number;
}

export interface ConstructorParams {
    /** Array of everscale api urls, example: ['net.ton.dev'] */
    everscaleApiUrls?: string[];
    /** Address of DIDRegistry contract */
    didRegistryAddress: string;
    /** Binary of Ton client {@link https://github.com/tonlabs/ton-client-js} */
    tonBinary: () => Promise<BinaryLibrary>
}

export interface GetDIDDocumentsParams {
    /** DID Document owner's public key, must be provided only one of public key or address, not both */
    eitherDocOwnerPubKey?: string;
    /** DID Document owner's account address, must be provided only one of public key or address, not both */
    orDocOwnerAddress?: string;
}

interface VerifyPubKeyOrAddressParams {
    address?: string;
    pubKey?: string;
}

/**
 * DIDRegistry class that provides methods to interact with DIDRegistry smart contract
 */
export class DIDRegistry {
    private readonly tonClient: TonClient;
    private contract: Account;

    /**
     * Constructor
     * @param data [Constructor params]{@link ConstructorParams}
     */
    constructor(data: ConstructorParams) {
        TonClient.useBinaryLibrary(data.tonBinary);
        const everscaleApiUrls = data.everscaleApiUrls === undefined ? ['https://net.ton.dev'] : data.everscaleApiUrls;
        this.tonClient = new TonClient({network: {endpoints: everscaleApiUrls}});
        this.contract = new Account({
            abi: DIDRegistryABI
        }, {
            address: data.didRegistryAddress,
            client: this.tonClient
        });
    }

    /**
     * Issue new DID document for given account or public key
     * @param params - Issue new DID document [input params]{@link IssueDidDocumentParams}
     */
    async issueDidDocument(params: IssueDidDocumentParams): Promise<string> {
        DIDRegistry.verifyIssueDidDocumentParams(params);

        if (!params.docOwnerAddress) {
            params.docOwnerAddress = ZERO_ADDRESS;
        }
        if (!params.docOwnerPubKey) {
            params.docOwnerPubKey = '0x0';
        }

        const res = await this.contract.run(
            'issueDidDoc',
            {
                answerId: 0,
                docOwnerPubKey: params.docOwnerPubKey,
                docOwnerAddress: params.docOwnerAddress,
                content: params.content,
                initialDocBalance: params.initialDocBalance
            },
            {
                signer: {
                    type: 'Keys',
                    keys: params.controllerKeys
                }
            }
        );

        return res.decoded?.output.didDocAddr;
    }

    /**
     * Get issued DID Documents in current DID Registry for specified account or public key
     * @param params - [Input params]{@link GetDIDDocumentsParams}
     */
    async getDidDocuments(params: GetDIDDocumentsParams): Promise<string[]> {
        DIDRegistry.verifyPubKeyOrAddress({
            pubKey: params.eitherDocOwnerPubKey,
            address: params.orDocOwnerAddress
        });
        if (!params.orDocOwnerAddress) {
            params.orDocOwnerAddress = ZERO_ADDRESS;
        }
        if (!params.eitherDocOwnerPubKey) {
            params.eitherDocOwnerPubKey = '0x0';
        }
        const res = await this.contract.runLocal('getDidDocs', {
            answerId: 0,
            eitherDocOwnerPubKey: params.eitherDocOwnerPubKey,
            orDocOwnerAddress: params.orDocOwnerAddress
        });
        return res.decoded?.output.docs;
    }

    private static verifyIssueDidDocumentParams(params: IssueDidDocumentParams) {
        // check if data.content is valid json
        try {
            JSON.parse(JSON.stringify(params.content));
        } catch (e) {
            throw new Error('Content is invalid json');
        }

        if (params.initialDocBalance < 0) {
            throw new Error('Initial doc balance must be positive');
        }

        this.verifyPubKeyOrAddress({
            pubKey: params.docOwnerPubKey,
            address: params.docOwnerAddress
        });
    }

    // eslint-disable-next-line complexity
    private static verifyPubKeyOrAddress(params: VerifyPubKeyOrAddressParams) {
        if (params.pubKey !== undefined && params.address !== undefined) {
            throw new Error('Only one of docOwnerPubKey and docOwnerAddress should be provided');
        }

        // check if data.docOwnerPubKey starts with "0x" and add it if not
        if (params.pubKey !== undefined && !params.pubKey.startsWith('0x')) {
            params.pubKey = `0x${params.pubKey}`;
        }

        // set data.docOwnerAddress to ZERO_ADDRESS if not provided
        if (params.address === undefined) {
            params.address = ZERO_ADDRESS;
        }

        if (params.pubKey === undefined) {
            params.pubKey = '0x0';
        }

        const PUB_KEY_LENGTH = 66;
        const ADDRESS_LENGTH = 66;

        // verify data.docOwnerPubKey length
        if (params.pubKey.length !== PUB_KEY_LENGTH) {
            throw new Error('docOwnerPubKey should be 66 characters long');
        }

        // verify data.docOwnerAddress length
        if (params.address.length !== ADDRESS_LENGTH) {
            throw new Error('docOwnerAddress should be 66 characters long');
        }
    }
}

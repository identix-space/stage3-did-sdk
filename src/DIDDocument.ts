import {ResultOfProcessMessage, TonClient} from '@tonclient/core';
import {Account} from '@tonclient/appkit';
import {BinaryLibrary} from '@tonclient/core/dist/bin';
import {DIDDocumentABI} from './DIDDocumentABI';
import {KeyPair} from '@tonclient/core/dist/modules';
import {AccountRunOptions} from '@tonclient/appkit/dist/account';

export interface ConstructorParams {
    /** Array of everscale api urls, example: ['net.ton.dev'] */
    everscaleApiUrls?: string[];
    /** Address of DID Document contract */
    didDocumentAddress: string;
    /** Binary of Ton client {@link https://github.com/tonlabs/ton-client-js} */
    tonBinary: () => Promise<BinaryLibrary>
}

/**
 * Class presenting work a DID Document.
 */
export class DIDDocument {
    private readonly tonClient: TonClient;
    private contract: Account;

    /**
     * Constructor of DIDDocument class.
     * @param data - [Constructor parameters]{@link ConstructorParams}
     */
    constructor(data: ConstructorParams) {
        TonClient.useBinaryLibrary(data.tonBinary);
        const everscaleApiUrls = data.everscaleApiUrls === undefined ? ['https://net.ton.dev'] : data.everscaleApiUrls;
        this.tonClient = new TonClient({network: {endpoints: everscaleApiUrls}});
        this.contract = new Account(
            {
                abi: DIDDocumentABI
            },
            {
                address: data.didDocumentAddress,
                client: this.tonClient
            }
        );
    }

    /**
     * Load DID document content from blockchain
     * @returns DID document content
     */
    async getContent(): Promise<string> {
        const res = await this.contract.runLocal('getContent', {
            answerId: 0,
            representationType: '0x1'
        });

        return res.decoded?.output.value0;
    }

    /**
     * Set DID document new content
     * @param docOwnerKeyPair - Key pair of DID document owner
     * @param newContent - DID document new content
     */
    async setContent(docOwnerKeyPair: KeyPair, newContent: string): Promise<string> {
        const res = await this.contract.run(
            'setContent',
            {
                content: newContent,
                representationType: '0x1'
            },
            {
                signer: {
                    type: 'Keys',
                    keys: docOwnerKeyPair
                }
            }
        );

        return res.decoded?.output.didDocAddr;
    }

    /**
     * Revoke DID document
     * @param docOwnerKeyPair
     */
    async revoke(docOwnerKeyPair: KeyPair): Promise<string> {
        const res = await this.contract.run(
            'setContent',
            {
                content: JSON.stringify({status: 'revoked'}),
                representationType: '0x1'
            },
            {
                signer: {
                    type: 'Keys',
                    keys: docOwnerKeyPair
                }
            }
        );

        return res.decoded?.output.didDocAddr;
    }

    /**
     * Call any method of DID Document contract
     * @param method - Method name
     * @param input - Input data
     * @param options - AccountRunOptions {@link AccountRunOptions}
     */
    async contractCall(method: string, input: object, options: AccountRunOptions): Promise<ResultOfProcessMessage> {
        return this.contract.run(method, input, options);
    }
}

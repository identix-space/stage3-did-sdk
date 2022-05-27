import { KeyPair } from '@tonclient/core/dist/modules';
import { BinaryLibrary } from '@tonclient/core/dist/bin';
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
    tonBinary: () => Promise<BinaryLibrary>;
}
export interface GetDIDDocumentsParams {
    /** DID Document owner's public key, must be provided only one of public key or address, not both */
    eitherDocOwnerPubKey?: string;
    /** DID Document owner's account address, must be provided only one of public key or address, not both */
    orDocOwnerAddress?: string;
}
/**
 * DIDRegistry class that provides methods to interact with DIDRegistry smart contract
 */
export declare class DIDRegistry {
    private readonly tonClient;
    private contract;
    /**
     * Constructor
     * @param data [Constructor params]{@link ConstructorParams}
     */
    constructor(data: ConstructorParams);
    /**
     * Issue new DID document for given account or public key
     * @param params - Issue new DID document [input params]{@link IssueDidDocumentParams}
     */
    issueDidDocument(params: IssueDidDocumentParams): Promise<string>;
    /**
     * Get issued DID Documents in current DID Registry for specified account or public key
     * @param params - [Input params]{@link GetDIDDocumentsParams}
     */
    getDidDocuments(params: GetDIDDocumentsParams): Promise<string[]>;
    private static verifyIssueDidDocumentParams;
    private static verifyPubKeyOrAddress;
}

import { BinaryLibrary } from '@tonclient/core/dist/bin';
export interface ConstructorParams {
    /** Array of everscale api urls, example: ['net.ton.dev'] */
    everscaleApiUrls?: string[];
    /** Address of DID Document contract */
    didDocumentAddress: string;
    /** Binary of Ton client {@link https://github.com/tonlabs/ton-client-js} */
    tonBinary: () => Promise<BinaryLibrary>;
}
/**
 * Class presenting work a DID Document.
 */
export declare class DIDDocument {
    private readonly tonClient;
    private contract;
    /**
     * Constructor of DIDDocument class.
     * @param data - [Constructor parameters]{@link ConstructorParams}
     */
    constructor(data: ConstructorParams);
    /**
     * Load DID document content from blockchain
     * @returns DID document content
     */
    getContent(): Promise<string>;
}

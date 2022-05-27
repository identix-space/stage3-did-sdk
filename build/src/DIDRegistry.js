"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDRegistry = void 0;
const core_1 = require("@tonclient/core");
const appkit_1 = require("@tonclient/appkit");
const DIDRegistryABI_1 = require("./DIDRegistryABI");
const constants_1 = require("./constants");
/**
 * DIDRegistry class that provides methods to interact with DIDRegistry smart contract
 */
class DIDRegistry {
    /**
     * Constructor
     * @param data [Constructor params]{@link ConstructorParams}
     */
    constructor(data) {
        core_1.TonClient.useBinaryLibrary(data.tonBinary);
        const everscaleApiUrls = data.everscaleApiUrls === undefined ? ['https://net.ton.dev'] : data.everscaleApiUrls;
        this.tonClient = new core_1.TonClient({ network: { endpoints: everscaleApiUrls } });
        this.contract = new appkit_1.Account({
            abi: DIDRegistryABI_1.DIDRegistryABI
        }, {
            address: data.didRegistryAddress,
            client: this.tonClient
        });
    }
    /**
     * Issue new DID document for given account or public key
     * @param params - Issue new DID document [input params]{@link IssueDidDocumentParams}
     */
    issueDidDocument(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            DIDRegistry.verifyIssueDidDocumentParams(params);
            if (!params.docOwnerAddress) {
                params.docOwnerAddress = constants_1.ZERO_ADDRESS;
            }
            if (!params.docOwnerPubKey) {
                params.docOwnerPubKey = '0x0';
            }
            const res = yield this.contract.run('issueDidDoc', {
                answerId: 0,
                docOwnerPubKey: params.docOwnerPubKey,
                docOwnerAddress: params.docOwnerAddress,
                content: params.content,
                initialDocBalance: params.initialDocBalance
            }, {
                signer: {
                    type: 'Keys',
                    keys: params.controllerKeys
                }
            });
            return (_a = res.decoded) === null || _a === void 0 ? void 0 : _a.output.didDocAddr;
        });
    }
    /**
     * Get issued DID Documents in current DID Registry for specified account or public key
     * @param params - [Input params]{@link GetDIDDocumentsParams}
     */
    getDidDocuments(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            DIDRegistry.verifyPubKeyOrAddress({
                pubKey: params.eitherDocOwnerPubKey,
                address: params.orDocOwnerAddress
            });
            if (!params.orDocOwnerAddress) {
                params.orDocOwnerAddress = constants_1.ZERO_ADDRESS;
            }
            if (!params.eitherDocOwnerPubKey) {
                params.eitherDocOwnerPubKey = '0x0';
            }
            const res = yield this.contract.runLocal('getDidDocs', {
                answerId: 0,
                eitherDocOwnerPubKey: params.eitherDocOwnerPubKey,
                orDocOwnerAddress: params.orDocOwnerAddress
            });
            return (_a = res.decoded) === null || _a === void 0 ? void 0 : _a.output.docs;
        });
    }
    static verifyIssueDidDocumentParams(params) {
        // check if data.content is valid json
        try {
            JSON.parse(JSON.stringify(params.content));
        }
        catch (e) {
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
    static verifyPubKeyOrAddress(params) {
        if (params.pubKey !== undefined && params.address !== undefined) {
            throw new Error('Only one of docOwnerPubKey and docOwnerAddress should be provided');
        }
        // check if data.docOwnerPubKey starts with "0x" and add it if not
        if (params.pubKey !== undefined && !params.pubKey.startsWith('0x')) {
            params.pubKey = `0x${params.pubKey}`;
        }
        // set data.docOwnerAddress to ZERO_ADDRESS if not provided
        if (params.address === undefined) {
            params.address = constants_1.ZERO_ADDRESS;
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
exports.DIDRegistry = DIDRegistry;
//# sourceMappingURL=DIDRegistry.js.map
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
exports.DIDDocument = void 0;
const core_1 = require("@tonclient/core");
const appkit_1 = require("@tonclient/appkit");
const DIDDocumentABI_1 = require("./DIDDocumentABI");
/**
 * Class presenting work a DID Document.
 */
class DIDDocument {
    /**
     * Constructor of DIDDocument class.
     * @param data - [Constructor parameters]{@link ConstructorParams}
     */
    constructor(data) {
        core_1.TonClient.useBinaryLibrary(data.tonBinary);
        const everscaleApiUrls = data.everscaleApiUrls === undefined ? ['https://net.ton.dev'] : data.everscaleApiUrls;
        this.tonClient = new core_1.TonClient({ network: { endpoints: everscaleApiUrls } });
        this.contract = new appkit_1.Account({
            abi: DIDDocumentABI_1.DIDDocumentABI
        }, {
            address: data.didDocumentAddress,
            client: this.tonClient
        });
    }
    /**
     * Load DID document content from blockchain
     * @returns DID document content
     */
    getContent() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.contract.runLocal('getContent', {
                answerId: 0,
                representationType: '0x1'
            });
            return (_a = res.decoded) === null || _a === void 0 ? void 0 : _a.output.value0;
        });
    }
}
exports.DIDDocument = DIDDocument;
//# sourceMappingURL=DIDDocument.js.map
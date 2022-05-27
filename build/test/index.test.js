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
const DIDRegistry_1 = require("../src/DIDRegistry");
const lib_node_1 = require("@tonclient/lib-node");
const DIDDocument_1 = require("../src/DIDDocument");
const everscaleKeyPair = {
    public: 'dd037dda67d9364dfe49afa980540bdd08d43f3d269d5bdd44d84d302888df18',
    secret: '671ad366c00ac3eaca5fd04ea352ab1cbdca7adb519ec7941b2613ca75507c80'
};
const didRegistryAddress = '0:7fff4d198fdb141f09ea4e43f1e1d387be86a76e09b99536ba71aeddcf3ea7a9';
function createDidDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        const didRegistry = new DIDRegistry_1.DIDRegistry({
            tonBinary: lib_node_1.libNode,
            didRegistryAddress
        });
        const MY_PUBLIC_KEY = `0x${everscaleKeyPair.public}`;
        const docsBefore = yield didRegistry.getDidDocuments({
            eitherDocOwnerPubKey: MY_PUBLIC_KEY
        });
        console.log('Docs BEFORE', docsBefore);
        const issueDidDocumentRes = yield didRegistry.issueDidDocument({
            docOwnerPubKey: MY_PUBLIC_KEY,
            controllerKeys: everscaleKeyPair,
            content: 'test_content',
            initialDocBalance: 50000000
        });
        console.log('issueDidDocumentRes', issueDidDocumentRes);
        const docsAfter = yield didRegistry.getDidDocuments({
            eitherDocOwnerPubKey: MY_PUBLIC_KEY
        });
        console.log('Docs AFTER', docsAfter);
        // log difference between docsBefore and docsAfter size
        console.log('Difference', docsAfter.length - docsBefore.length);
        const didDocumentAddress = docsAfter[docsAfter.length - 1];
        console.log('DID Document Address', didDocumentAddress);
        return didDocumentAddress;
    });
}
function loadDidDocumentContent(didDocumentAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const didDoc = new DIDDocument_1.DIDDocument({
            didDocumentAddress,
            tonBinary: lib_node_1.libNode
        });
        const didDocContent = yield didDoc.getContent();
        console.log('DID Document content:', didDocContent);
    });
}
test('Create DID Document and load it', () => __awaiter(void 0, void 0, void 0, function* () {
    // const didDocumentAddress = '0:31856bef52cfec2497899bb10a6061251b01950e14c60cdc5581b6a905dfe298';
    const didDocumentAddress = yield createDidDocument();
    console.log('Waiting 10 seconds to make sure that the DID document is deployed');
    // eslint-disable-next-line no-magic-numbers
    yield new Promise(resolve => setTimeout(resolve, 10000));
    yield loadDidDocumentContent(didDocumentAddress);
}));
//# sourceMappingURL=index.test.js.map
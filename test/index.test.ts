import {DIDRegistry} from '../src/DIDRegistry';
import {libNode} from '@tonclient/lib-node';
import {DIDDocument} from '../src/DIDDocument';

const everscaleKeyPair = {
    public: 'dd037dda67d9364dfe49afa980540bdd08d43f3d269d5bdd44d84d302888df18',
    secret: '671ad366c00ac3eaca5fd04ea352ab1cbdca7adb519ec7941b2613ca75507c80'
};

const didRegistryAddress = '0:7fff4d198fdb141f09ea4e43f1e1d387be86a76e09b99536ba71aeddcf3ea7a9';

async function createDidDocument(): Promise<string> {
    const didRegistry = new DIDRegistry({
        tonBinary: libNode,
        didRegistryAddress
    });
    const MY_PUBLIC_KEY = `0x${everscaleKeyPair.public}`;
    const docsBefore = await didRegistry.getDidDocuments({
        eitherDocOwnerPubKey: MY_PUBLIC_KEY
    });
    console.log('Docs BEFORE', docsBefore);
    const issueDidDocumentRes = await didRegistry.issueDidDocument({
        docOwnerPubKey: MY_PUBLIC_KEY,
        controllerKeys: everscaleKeyPair,
        content: 'test_content',
        initialDocBalance: 5_000_000_0
    });

    console.log('issueDidDocumentRes', issueDidDocumentRes);

    const docsAfter = await didRegistry.getDidDocuments({
        eitherDocOwnerPubKey: MY_PUBLIC_KEY
    });
    console.log('Docs AFTER', docsAfter);
    // log difference between docsBefore and docsAfter size
    console.log('Difference', docsAfter.length - docsBefore.length);

    const didDocumentAddress = docsAfter[docsAfter.length - 1];
    console.log('DID Document Address', didDocumentAddress);

    return didDocumentAddress;
}

async function loadDidDocumentContent(didDocumentAddress: string) {
    const didDoc = new DIDDocument({
        didDocumentAddress,
        tonBinary: libNode
    });

    const didDocContent = await didDoc.getContent();
    console.log('DID Document content:', didDocContent);
}

test('Create DID Document and load it', async () => {
    // const didDocumentAddress = '0:31856bef52cfec2497899bb10a6061251b01950e14c60cdc5581b6a905dfe298';
    const didDocumentAddress = await createDidDocument();

    console.log('Waiting 10 seconds to make sure that the DID document is deployed');
    // eslint-disable-next-line no-magic-numbers
    await new Promise(resolve => setTimeout(resolve, 10000));

    await loadDidDocumentContent(didDocumentAddress);
});

![](assets/logo.png "Logo")

## Documentation is [available here](docs/index.md)

---

## Get started

### Install SDK

- `npm i git+https://gitlab.com/everscale-id/everscaleid-sdk.git`

### Init SDK

```typescript
import {DIDRegistry} from 'everscaleidsdk/build/src/DIDRegistry';
import {DIDDocument} from 'everscaleidsdk/build/src/DIDDocument';

import {libNode} from '@tonclient/lib-node';
// or
// import {libWeb} from '@tonclient/lib-web';

const DID_REGISTRY_CONTROLLER_KEYS = {
    public: 'dd037dda67d9364dfe49afa980540bdd08d43f3d269d5bdd44d84d302888df18',
    secret: '671ad366c00ac3eaca5fd04ea352ab1cbdca7adb519ec7941b2613ca75507c80'
};

const DID_REGISTRY_ADDRESS = '0:a7aa8cd8af7855c79025c38d86bf27b5d3dddecee0143b9d94ada3c7a5c28507';

const didRegistry = new DIDRegistry({
    tonBinary: libNode,
    didRegistryAddress: DID_REGISTRY_ADDRESS
});
```

### Load list of DID document addresses

```typescript
const DID_DOCUMENT_OWNER_PUBKEY = `0x${DID_REGISTRY_CONTROLLER_KEYS.public}`;
const didList = await didRegistry.getDidDocuments({
    eitherDocOwnerPubKey: DID_DOCUMENT_OWNER_PUBKEY
});
```

### Issue new DID document

```typescript
const didDocumentAddress = await didRegistry.issueDidDocument({
    docOwnerPubKey: DID_DOCUMENT_OWNER_PUBKEY,
    controllerKeys: DID_REGISTRY_CONTROLLER_KEYS,
    content: 'test_content'
});
```

### Load DID Document

```typescript
const didDoc = new DIDDocument({
    tonBinary: libNode,
    didDocumentAddress
});
const didDocContent = await didDoc.getContent();
```

## Tests

- `npm run test`

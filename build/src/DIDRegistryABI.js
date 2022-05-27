"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDRegistryABI = void 0;
exports.DIDRegistryABI = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [
                { name: 'controllerPubKey_', type: 'uint256' },
                { name: 'controllerAddress_', type: 'address' }
            ],
            outputs: []
        },
        {
            name: 'issueDidDoc',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'docOwnerPubKey', type: 'uint256' },
                { name: 'docOwnerAddress', type: 'address' },
                { name: 'content', type: 'string' },
                { name: 'initialDocBalance', type: 'uint32' }
            ],
            outputs: [
                { name: 'didDocAddr', type: 'address' }
            ]
        },
        {
            name: 'getDidDocs',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'eitherDocOwnerPubKey', type: 'uint256' },
                { name: 'orDocOwnerAddress', type: 'address' }
            ],
            outputs: [
                { name: 'docs', type: 'address[]' }
            ]
        },
        {
            name: 'resetDocStorage',
            inputs: [],
            outputs: []
        },
        {
            name: 'setTemplate',
            inputs: [
                { name: 'code', type: 'cell' }
            ],
            outputs: []
        },
        {
            name: 'changeOwner',
            inputs: [
                { name: 'eitherNewOwnerPubKey', type: 'uint256' },
                { name: 'orNewOwnerAddress', type: 'address' }
            ],
            outputs: []
        },
        {
            name: 'transfer',
            inputs: [
                { name: 'dest', type: 'address' },
                { name: 'amount', type: 'uint128' },
                { name: 'bounce', type: 'bool' }
            ],
            outputs: []
        },
        {
            name: 'controllerPubKey',
            inputs: [],
            outputs: [
                { name: 'controllerPubKey', type: 'uint256' }
            ]
        },
        {
            name: 'controllerAddress',
            inputs: [],
            outputs: [
                { name: 'controllerAddress', type: 'address' }
            ]
        }
    ],
    data: [],
    events: [],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: 'templateCode', type: 'cell' },
        { name: 'controllerPubKey', type: 'uint256' },
        { name: 'controllerAddress', type: 'address' },
        { name: 'documentsByAddress', type: 'map(address,address[])' },
        { name: 'documentsByPubKey', type: 'map(uint256,address[])' },
        { name: 'ver', type: 'uint8' }
    ]
};
//# sourceMappingURL=DIDRegistryABI.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDDocumentABI = void 0;
exports.DIDDocumentABI = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [
                { name: 'ownerPubKey_', type: 'uint256' },
                { name: 'ownerAddress_', type: 'address' }
            ],
            outputs: []
        },
        {
            name: 'getOwner',
            inputs: [
                { name: 'answerId', type: 'uint32' }
            ],
            outputs: [
                { name: 'pubKey', type: 'uint256' },
                { name: 'addr', type: 'address' }
            ]
        },
        {
            name: 'getDid',
            inputs: [
                { name: 'answerId', type: 'uint32' }
            ],
            outputs: [
                { name: 'did', type: 'string' }
            ]
        },
        {
            name: 'setContent',
            inputs: [
                { name: 'content', type: 'string' },
                { name: 'representationType', type: 'uint8' }
            ],
            outputs: []
        },
        {
            name: 'getContent',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'representationType', type: 'uint8' }
            ],
            outputs: [
                { name: 'value0', type: 'string' }
            ]
        },
        {
            name: 'getActive',
            inputs: [
                { name: 'answerId', type: 'uint32' }
            ],
            outputs: [
                { name: 'value0', type: 'bool' }
            ]
        },
        {
            name: 'setActive',
            inputs: [
                { name: 'newValue', type: 'bool' }
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
            name: 'representations',
            inputs: [],
            outputs: [
                { name: 'representations', type: 'map(uint8,string)' }
            ]
        }
    ],
    data: [
        { key: 1, name: 'issuingAuthority', type: 'address' }
    ],
    events: [],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: 'representations', type: 'map(uint8,string)' },
        { name: 'ownerPubKey', type: 'uint256' },
        { name: 'ownerAddress', type: 'address' },
        { name: 'isActive', type: 'bool' },
        { name: 'issuingAuthority', type: 'address' }
    ]
};
//# sourceMappingURL=DIDDocumentABI.js.map
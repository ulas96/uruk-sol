export type Uruk = {
  version: '0.1.0';
  name: 'uruk';
  instructions: [
    {
      name: 'close';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'uruk';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'decrement';
      accounts: [
        {
          name: 'uruk';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'increment';
      accounts: [
        {
          name: 'uruk';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'initialize';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'uruk';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'set';
      accounts: [
        {
          name: 'uruk';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'value';
          type: 'u8';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'uruk';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'count';
            type: 'u8';
          }
        ];
      };
    }
  ];
};

export const IDL: Uruk = {
  version: '0.1.0',
  name: 'uruk',
  instructions: [
    {
      name: 'close',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'uruk',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'decrement',
      accounts: [
        {
          name: 'uruk',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'increment',
      accounts: [
        {
          name: 'uruk',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'initialize',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'uruk',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'set',
      accounts: [
        {
          name: 'uruk',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'value',
          type: 'u8',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'uruk',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'count',
            type: 'u8',
          },
        ],
      },
    },
  ],
};

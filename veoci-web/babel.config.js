module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false,
                loose: true
            }
        ]
    ],
    plugins: [
        'transform-vue-jsx',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: false,
                regenerator: true,
                corejs: false
            }
        ]
    ],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
            plugins: [
                'transform-vue-jsx',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-export-default-from',
                [
                    '@babel/plugin-transform-runtime',
                    {
                        helpers: false,
                        regenerator: true,
                        corejs: false
                    }
                ]
            ]
        }
    }
}

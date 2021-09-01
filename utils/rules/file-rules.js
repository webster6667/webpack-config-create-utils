module.exports = (props = {}) => {

    const {
        publicPath = ''
    } = props,
        svgoLoader = {
            loader: 'svgo-loader',
            options: {
                plugins: [
                    {
                        name: 'removeViewBox',
                        active: false,
                    }
                ]
            }
        }

    return [
        {
            test: /\.svg$/,
            type: 'javascript/auto',
            issuer: {
                and: [/\.[j|t]sx?$/],
            },
            use: [
                { loader: '@svgr/webpack' },
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'src/img/svg'
                    }
                },
                {...svgoLoader}
            ]
        },
        {
            test: /\.(svg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'src/img/svg/[name][ext]'
            },
            issuer: {
                and: [/\.s?css$/],
            },
            use: [{...svgoLoader}]
        },
        {
            test: /\.(png|jpe?g|webp)$/,
            type: 'asset/resource',
            generator: {
             filename: 'src/img/[name][ext]'
            }
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename: 'src/fonts/[name][ext]'
            }
        }


    ]

}

// {
//     loader: 'svgo-loader',
//         options: {
//     plugins: [
//         {
//             name: 'removeViewBox',
//             active: true,
//         }
//     ]
// }

// loader: 'file-loader',
// options: {
//     publicPath,
//     name: '[hash].[ext]',
//     outputPath: 'img'
// }

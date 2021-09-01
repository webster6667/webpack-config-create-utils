const joinLoaders = require('./helpers/join-loaders'),
      clearLoaders = require('./helpers/clear-loader-params')
      MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (props = {}) => {

    const {
            lessFilesForImport = [],
            sassFilesForImport = [],
            additionalLoaders = [],
            additionalLessLoaders = [],
            additionalSassLoaders = []
        } = props,
          miniCssExtractLoader = {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  publicPath: ''
              }
          },
          getPreprocessorRules = (preprocessorLoader = 'sass-loader', filesForImport = []) => {

          const styleLoaders = [
                    {
                        loaderName: 'mini-css-extract',
                        ...miniCssExtractLoader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'group-css-media-queries-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: preprocessorLoader,
                        options: {
                            sourceMap: true,
                            webpackImporter: false
                        }
                    },
                    {
                        loader: 'grand-parent-loader'
                    },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: filesForImport
                        }
                    }
                ],
                additionalPreprocessorLoaders = preprocessorLoader === 'sass-loader' ? [...additionalLoaders, ...additionalSassLoaders] : [...additionalLoaders, ...additionalLessLoaders],
                joinedLoaders = joinLoaders(styleLoaders, additionalPreprocessorLoaders)

                /**
                 * Clear loader from not valid params for webpack
                 */
                clearLoaders(joinedLoaders)


              return joinedLoaders
          }


    return [
        {
            test: /\.css$/,
            use: [{...miniCssExtractLoader}, 'css-loader', 'postcss-loader', 'group-css-media-queries-loader']
        },
        {
            test: /\.scss$/,
            use: [
                ...getPreprocessorRules('sass-loader', sassFilesForImport),
            ]
        },
        {
            test: /\.less$/,
            use: [
                ...getPreprocessorRules('less-loader', lessFilesForImport)
            ]
        },
    ]
}
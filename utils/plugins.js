const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({
                      isProd,
                      HtmlPluginSettings = {},
                      CleanPluginSettings = {},
                      MiniCssExtractPluginSettings = {}
}) => {

    return [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            },
            ...HtmlPluginSettings
        }),
        new CleanWebpackPlugin(CleanPluginSettings),
        new MiniCssExtractPlugin(MiniCssExtractPluginSettings)
    ]
}
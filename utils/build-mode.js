const TerserWebpackPlugin = require('terser-webpack-plugin'),
      CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const getOptimizationSettingsByMode = (isProd) => {
        let config = {
            splitChunks: {
                chunks: 'all'
            }
        }

        if (isProd) config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]

        return config
}

module.exports = () => {

    const isDev = process.env.NODE_ENV === 'development',
          isProd = !isDev,
          buildModeByNodeEnv = isDev ? 'development' : 'production',
          getFileNameByMode = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`),
          optimizationSettingsByMode = getOptimizationSettingsByMode(isProd)


    return {isDev, isProd, buildModeByNodeEnv, optimizationSettingsByMode, getFileNameByMode}
}
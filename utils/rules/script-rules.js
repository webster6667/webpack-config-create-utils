module.exports = (props = {}) => {

    const {
        jsFrameworkName = 'react',
        additionalBabelPlugins = [],
        additionalBabelPresets = [],
        additionalLoaders = []
    } = props,
        frameworkPresets = []

    switch (jsFrameworkName) {
        case 'react':
            frameworkPresets.push('@babel/preset-react')
        break;
    }

    return {
            test: /\.[j|t]sx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', frameworkPresets, ...additionalBabelPresets, ...additionalLoaders],
                        plugins: ['@babel/plugin-proposal-class-properties', ...additionalBabelPlugins]
                    }
                },
                ...additionalLoaders
            ]
    }
}
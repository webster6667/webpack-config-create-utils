module.exports = (webpackVersion = 'webpack5') => {
    const getBuildMode = require('./utils/build-mode'),
          getDefaultPlugins = require('./utils/plugins'),
          getResolveExtensions = require('./utils/resolve-extensions'),
          getStyleRules = require('./utils/rules/style-rules'),
          getScriptRules = require('./utils/rules/script-rules'),
          getFileRules = require('./utils/rules/file-rules'),
          getAliasFromFile = require('./utils/alias-parser')


    return {getBuildMode, getDefaultPlugins, getResolveExtensions, getStyleRules, getScriptRules, getFileRules, getAliasFromFile}
}
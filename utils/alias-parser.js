const fs = require('fs');

module.exports = (relativeDirPath = '', pathAliasFile = 'tsconfig.json') => {

    const fullPathToTsConfigFile = `${relativeDirPath}/${pathAliasFile}`,
          aliasFileObject = JSON.parse(fs.readFileSync(fullPathToTsConfigFile, 'utf8')),
          isAliasExist = aliasFileObject.compilerOptions && aliasFileObject.compilerOptions.paths || aliasFileObject.paths,
          webpackAliasList = {}

        if (isAliasExist) {

            const isAliasInTsConfig = aliasFileObject.compilerOptions && aliasFileObject.compilerOptions.paths,
                  tsAliasList = isAliasInTsConfig ? aliasFileObject.compilerOptions.paths : aliasFileObject.paths

            Object.keys(tsAliasList).map((tsAliasName, key) => {
                const tsAliasPath = tsAliasList[tsAliasName][0],
                      webpackAliasName = tsAliasName.replace('/*', ''),
                      webpackAliasPath = tsAliasPath.replace('/*', '')

                webpackAliasList[webpackAliasName] = `${relativeDirPath}/${webpackAliasPath}`
            })

        }


    return webpackAliasList
}


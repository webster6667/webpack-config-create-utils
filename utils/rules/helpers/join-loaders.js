const getLoaderIndexByName = require('./get-loader-index-by-name.js')

module.exports = (loadersList = [], additionalLoaders = []) => {

    if (Array.isArray(additionalLoaders)) {
        
        additionalLoaders.map((additionalLoader) => {

            if (typeof additionalLoader === 'string') {
                loadersList.push(additionalLoader)
            } else {

                const hasAdditionalLoaderPosition = additionalLoader.pushBefore
                
                if (hasAdditionalLoaderPosition) {
                    
                    const loaderNameBeforeWhichPush = additionalLoader.pushBefore,
                          loaderIndex = getLoaderIndexByName(loadersList, loaderNameBeforeWhichPush),
                          loaderHasIndexForPush = loaderIndex !== null

                    if (loaderHasIndexForPush) {
                        loadersList.splice(loaderIndex, 0, additionalLoader)
                    } else {
                        loadersList.push(additionalLoader)
                    }
                    
                } 
                
            }

        })

    }

    return loadersList
}
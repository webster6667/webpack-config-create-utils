module.exports = (loadersList = []) => {

    if (Array.isArray(loadersList)) {

        loadersList.map((loader) => {

            if (typeof loader === 'object') {

                if (loader.loaderName) {
                    delete loader.loaderName
                }

                if (loader.pushBefore) {
                    delete loader.pushBefore
                }

            }

        })

    }
}
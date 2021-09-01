
module.exports = (loadersList = [], loaderName = '') => {

    let loaderIndex = null

    loadersList.forEach((loader, index) => {
        if (loader === loaderName) {
            loaderIndex = index
        } else if(loader.loader && loader.loader === loaderName) {
            loaderIndex = index
        } else if(loader.loaderName && loader.loaderName === loaderName) {
            loaderIndex = index
        }
    })

    return loaderIndex
}


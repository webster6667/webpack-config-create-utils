module.exports = (additionalExtensions = []) => {
    return ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less', '.scss', '.sass', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.eot', '.ttf', '.woff2', '.php', ...additionalExtensions]
}
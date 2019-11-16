module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-blog/' : '/',
    outputDir: 'dist',
    devServer: {
        port: 8080
    }
}
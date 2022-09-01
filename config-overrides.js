const path = require('path');

module.exports = {
    paths: function (paths, env) {
        paths.appBuild = path.resolve(__dirname, 'client/build')
        paths.appPublic = path.resolve(__dirname, 'client/public')
        paths.appHtml = path.resolve(__dirname, 'client/public/index.html')
        paths.appSrc = path.resolve(__dirname, 'client/src')
        paths.appIndexJs = path.resolve(__dirname, 'client/src/index.js')
        console.log(paths)
        return paths;
    }
};
/**
 * @file 安装npm pkg的功能
 * @author leeight(liyubei@baidu.com)
 */

var Deferred = require('./base/Deferred');

/**
 * 安装npm pkg
 *
 * @param {string|Array.<string>} pkgs 需要安装的npm pkg的名称.
 * @return {Deferred}
 */
exports.install = function (pkgs) {
    var d = new Deferred();

    if (typeof pkgs === 'string') {
        pkgs = [pkgs];
    }

    var args = ['install', '-g'].concat(pkgs);
    var npm = require('./util').spawn('npm', args, {
        stdio: 'inherit'
    });
    npm.on('close', function (code) {
        if (code !== 0) {
            d.reject(new Error(code));
            return;
        }

        d.resolve();
    });

    return d.promise;
};

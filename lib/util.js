/**
 * edp-core/lib/util.js ~ 2014/02/19 21:32:26
 * @author leeight(liyubei@baidu.com)
 * @ignore
 * 工具类函数
 **/

/**
 * @class util
 */
var exports = {};

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {...Object} var_args 源对象
 * @return {Object} 返回目标对象
 */
exports.extend = function (target, var_args) {
    for (var i = 1; i < arguments.length; i++) {
        var src = arguments[i];
        if (src == null) {
            continue;
        }
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                target[key] = src[key];
            }
        }
    }
    return target;
};

/**
 * 混合对象
 *
 * @param {...Object} var_args 要混合的对象
 * @return {Object} 混合后的对象
 */
exports.mix = function () {
    var o = {};
    var src = Array.prototype.slice.call(arguments);
    return exports.extend.apply(this, [o].concat(src));
};

/**
 * 深度复制一个对象的内容
 *
 * @param {Object} source 源对象.
 * @return {Object} 复制之后的内容.
 */
exports.clone = function ( source ) {
    return JSON.parse( JSON.stringify( source ) );
};


/**
 * 根据功能将文字色彩化
 *
 * @param {string} text 源文字
 * @param {string} type 功能类型
 * @return {string}
 */
exports.colorize = function ( text, type ) {
    var chalk = require( 'chalk' );
    var colorBrushes = {
        info: chalk.grey,
        success: chalk.green,
        warning: chalk.yellow,
        error: chalk.red,
        title: chalk.cyan.bold,
        link: chalk.blue.underline
    };
    var fn = colorBrushes[ type ] || chalk.stripColor;

    return fn(text);
};

/**
 * @ignore
 */
module.exports = exports;

















/* vim: set ts=4 sw=4 sts=4 tw=100: */

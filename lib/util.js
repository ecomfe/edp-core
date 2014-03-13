/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * edp-core/lib/util.js ~ 2014/02/19 21:32:26
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 工具类函数
 **/
/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {...Object} source 源对象
 * @return {Object} 返回目标对象
 */
exports.extend = function (target) {
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
 * @param {...Object} source 要混合的对象
 * @return {Object} 混合后的对象
 */
exports.mix = function () {
    var o = {};
    var src = Array.prototype.slice.call(arguments);
    return exports.extend.apply(this, [o].concat(src));
};

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
 * 读取json文件
 * 
 * @param {string} file 文件路径
 * @return {Object} 
 */
exports.readJSONFile = function ( file ) {
    var fs = require( 'fs' );
    var content = fs.readFileSync( file, 'UTF-8' );
    if ( content.charCodeAt( 0 ) === 0xFEFF ) {
        content = content.slice( 1 );
    }

    return JSON.parse( content );
};
















/* vim: set ts=4 sw=4 sts=4 tw=100: */

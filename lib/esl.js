/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * lib/esl.js ~ 2014/02/25 16:25:25
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * esl相关的一些常用函数
 **/
var log = require( './log' );

/**
 * @param {string} code js代码.
 * @param {string} file js文件名.
 * @return {?ModuleInfo|?Array.<ModuleInfo>}
 */
exports.getAst = function( code, file ) {
    var ast = null;

    try {
        ast = require( 'esprima' ).parse( code );
    } catch ( ex ) {
        log.fatal('Parse code failed, file = [%s]', file );
        return null;
    }

    return ast;
}

/**
 * @param {Object} ast 模块代码的ast
 * @return {Object|Array} 模块信息，或模块信息数组。
 *                        每个模块信息包含id, dependencies, factoryAst, actualDependencies
 */
exports.analyseModule = function( ast ) {
    return require( './esl/analyse-module' )( ast );
}





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

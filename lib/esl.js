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

/**
 * 获取module文件路径
 * 
 * @param {string} moduleId module id
 * @param {string} moduleConfigFile module配置文件路径
 * @return {string}
 */
exports.getModuleFile = function( moduleId, moduleConfigFile ) {
    return require( './esl/get-module-file' )( moduleId, moduleConfigFile );
}

/**
 * 将相对的module id转换成绝对id
 * 
 * @param {string} id 要转换的id
 * @param {string} baseId 基础id
 * @return {string}
 */
exports.resolveModuleId = function( id, baseId ) {
    return require( './esl/resolve-module-id' )( id, baseId );
}

/**
 * 从内容中读取loader配置信息
 * 
 * @param {string} content 内容
 * @return {Object}
 */
exports.readLoaderConfig = function( content) {
    return require( './esl/read-loader-config' )( content );
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

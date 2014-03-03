/**
 * esl.js ~ 2014/02/12 21:42:57
 * @author leeight(liyubei@baidu.com)
 * @ignore
 **/

/**
 * @ignore
 */
var log = require( './log' );

/**
 * @class esl
 */
var esl = {};

/**
 * 基于esprima分析源码，返回ast数据结构，如果失败了的话，返回null.
 *
 * @param {string} code js代码.
 * @param {string} file js文件名.
 * @return {Object|null}
 */
esl.getAst = function( code, file ) {
    var ast = null;

    try {
        ast = require( 'esprima' ).parse( code );
    } catch ( ex ) {
        log.fatal('Parse code failed, file = [%s]', file );
        return null;
    }

    return ast;
};

/**
 * 分析模块的ast数据，返回模块的定义信息，如果只有一个模块定义的话，返回Object，否则返回一个
 * 数组，数组中包含多个Object.
 *
 * @param {Object} ast 模块代码的ast
 * @return {Object|Array.<Object>} 模块信息，或模块信息数组。
 * 每个模块信息包含id, dependencies, factoryAst, actualDependencies
 */
esl.analyseModule = function( ast ) {
    return require( './esl/analyse-module' )( ast );
};

/**
 * 根据module id获取module文件路径，获取文件路径的时候依赖于module.conf文件.
 *
 * @param {string} moduleId module id
 * @param {string} moduleConfigFile module配置文件路径
 * @return {string}
 */
esl.getModuleFile = function( moduleId, moduleConfigFile ) {
    return require( './esl/get-module-file' )( moduleId, moduleConfigFile );
};

/**
 * 根据module文件路径计算module id，依赖于module.conf文件的内容。因为
 * 一个文件可能会对应到多个module id，因此返回的是一个数组，不是单独一个字符串。
 * 
 * @param {string} moduleFile module文件路径
 * @param {string} moduleConfigFile module配置文件路径
 * @return {Array.<string>}
 */
esl.getModuleId = function ( moduleFile, moduleConfigFile ) {
    return require( './esl/get-module-id' )( moduleFile, moduleConfigFile );
};

/**
 * 将相对的module id转换成绝对id
 * 
 * @param {string} id 要转换的id
 * @param {string} baseId 基础id
 * @return {string}
 */
esl.resolveModuleId = function( id, baseId ) {
    return require( './esl/resolve-module-id' )( id, baseId );
};

/**
 * 从内容中读取loader配置信息，如果解析失败了，返回null.
 *
 * @param {string} content 内容
 * @return {{content: string, data: (Object|null), fromIndex: number}}
 */
esl.readLoaderConfig = function( content ) {
    return require( './esl/read-loader-config' )( content );
};

/**
 * @ignore
 */
module.exports = exports = esl;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

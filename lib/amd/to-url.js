/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * ../edp-core/lib/esl/to-url.js ~ 2014/03/28 22:27:55
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 根据模块Id计算文件路径.
 **/
var edp = require( '../../index' );

/**
 * 根据moduleId计算它的文件路径，如果是远程的文件路径，则直接忽略.
 *
 * @param {string} moduleId 模块的Id，也就是require函数的参数.
 * @param {string} baseId 所在模块的Id.
 * @param {string} baseFile 如果是匿名模块的话，就必须传递匿名模块所在的文件路径了.
 * @param {string} moduleConfigFile module.conf的文件内容.
 *
 * @return {{file: string, resource: string}}
 */
function toUrl( moduleId, baseId, baseFile, moduleConfigFile ) {
    var file = null;
    var resource = null;

    var parts = moduleId.split( '!' );

    var resourceId = parts[ 1 ];
    if ( resourceId && edp.path.isLocalPath( resourceId ) ) {
        resource = toUrl( resourceId, baseId, baseFile, moduleConfigFile ).file;
    }

    moduleId = parts[ 0 ];
    if ( moduleId[ 0 ] === '.' ) {
        // relative id
        if ( !baseId ) {
            file =
                edp.path.normalize(
                    edp.path.join(
                        edp.path.dirname( baseFile ), moduleId ) ) + '.js';
        }
        else {
            // translate `relative id` to `top level id`
            moduleId = edp.esl.resolveModuleId( moduleId, baseId );
        }
    }

    if ( !file ) {
        // top level id
        file = edp.esl.getModuleFile( moduleId, moduleConfigFile );
    }

    return { file: file, resource: resource };
}

module.exports = exports = toUrl;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

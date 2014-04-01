/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * cli/unlink.js ~ 2014/04/01 11:52:40
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *
 **/

/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令描述信息
 *
 * @type {string}
 */
cli.description = 'Delete the edp user command symlink';

/**
 * 模块命令行运行入口
 *
 * @param {Array} args 命令运行参数
 */
cli.main = function ( args ) {
    var log = require( '../lib/log' );

    var pkg = null;
    try {
        pkg = require( process.cwd() );
    }
    catch( ex ) {
        log.warn( ex.toString() );
        return;
    }

    var edpRoot = process.env[ 'EDP_ROOT_PATH' ];
    if ( !edpRoot ) {
        log.warn( 'Can\'t find process.env.EDP_ROOT_PATH' );
        return;
    }

    var fs = require( 'fs' );
    var path = require( 'path' );

    var pkgConfig = JSON.parse(
        fs.readFileSync( 'package.json', 'utf-8' ) );
    var pkgName = pkgConfig.name;

    var dstpath = path.join( edpRoot, 'node_modules', pkgName ) ;
    if ( !fs.existsSync( dstpath ) ) {
        log.warn( 'No such directory. %s',  dstpath );
        return;
    }

    fs.unlinkSync( dstpath );
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

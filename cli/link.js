/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * link.js ~ 2014/04/01 11:42:40
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 开发User Command的时候，执行edp link，方便调试.
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
cli.description = 'Create symlink and debug edp user command';

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
    if ( fs.existsSync( dstpath ) ) {
        log.warn( 'Directory already exists. %s',  dstpath );
        return;
    }

    fs.symlinkSync( process.cwd(), dstpath );
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

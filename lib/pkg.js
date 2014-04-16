/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * lib/pkg.js ~ 2014/03/07 14:17:36
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 安装npm pkg的功能
 **/
var Deferred = require( './base/Deferred' );

/**
 * @param {string|Array.<string>} pkgs 需要安装的npm pkg的名称.
 * @return {Deferred}
 */
exports.install = function( pkgs ) {
    var d = new Deferred();

    if ( typeof pkgs === 'string' ) {
        pkgs = [ pkgs ];
    }

    var npmConfig = require( './util' ).getNpmConfig();

    var cwd = process.cwd();

    var edpRoot = process.env[ 'EDP_ROOT_PATH' ];
    if ( edpRoot ) {
        process.chdir( edpRoot );
    }

    var args = [ 'install', '-g' ].concat( pkgs );
    var npm = require( './util' ).spawn( 'npm', args );
    npm.stdout.on( 'data', function( data ){
        // IGNORE
    });
    npm.on( 'close', function( code ){
        // 切换到老的目录，否则又可能遇到权限的问题.
        process.chdir( cwd );

        if ( code !== 0 ) {
            d.reject( new Error( code ) );
            return;
        }

        d.resolve();
    });

    return d;
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

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
var npm = require( 'npm' );
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

    var npmConfig = {
        'registry': 'http://registry.npmjs.org/',
        'proxy': null,
        'https-proxy': null,
        'http-proxy': null,
        'strict-ssl': false
    };
    npm.load( npmConfig, function( er ) {
        npm.commands.install( pkgs, function( er, data ) {
            if ( er ) {
                d.reject( er );
                return;
            }

            d.resolve();
        });
    });

    return d;
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

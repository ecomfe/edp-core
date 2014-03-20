/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * lib/esl/get-all-modules.js ~ 2014/03/20 16:01:05
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var fs = require( 'fs' );
var path = require( 'path' );

var util = require( '../util' );
var log = require( '../log' );
var esl = require( '../esl' );

function getAllModules( moduleConfigFile, opt_dir ) {
    var allModules = [];

    function scanDir( dir ) {
        if ( !fs.existsSync( dir ) ) {
            log.error( 'No such file or directory: %s', dir );
        }
        else {
            util.scanDir( dir, function( file ){
                if ( !/\.js$/.test( file ) ) {
                    return;
                }

                var moduleIds = esl.getModuleId( file, moduleConfigFile );
                if ( moduleIds.length ) {
                    allModules.push.apply( allModules, moduleIds );
                }
            });
        }
    }

    if ( !opt_dir ) {
        var config = JSON.parse( fs.readFileSync( moduleConfigFile, 'utf-8' ) );
        var projectDir = path.dirname( moduleConfigFile );
        var baseDir = path.join( projectDir, config.baseUrl );
        scanDir( baseDir );

        if ( config.packages && config.packages.length ) {
            config.packages.forEach(function( pkg ){
                scanDir( path.join( projectDir, pkg.location ) );
                // 对于etpl/2.0.8/src/main.js来说，计算出的moduleId是etpl，而不是etpl/main
                // 但是某些代码里面是直接require('etpl/main')，虽然也是正确的，但是我们的allModules
                // 不存在，所以想ignore的时候就不行了，因此我们这里人肉补充，虽然可能有重复
                // 但是不会有啥影响.
                if ( pkg.main ) {
                    allModules.push( path.normalize( pkg.name + '/' + pkg.main ) );
                }
            });
        }
    }
    else {
        // TODO(user) 如果opt_dir是一个package的目录，如何补充上pkg/main呢？
        scanDir( opt_dir );
    }

    return allModules;
};

module.exports = exports = getAllModules;





















/* vim: set ts=4 sw=4 sts=4 tw=100: */

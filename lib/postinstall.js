/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * lib/postinstall.js ~ 2014/04/12 10:59:18
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 关键的一个问题是需要在node_modules目录下面创建npm的软链
 * 但是直接使用npm link npm就会出现一些莫名其妙的问题
 **/
var fs = require( 'fs' );
var path = require( 'path' );

var log = require( './log' );

function main() {
    var npm = require( './util' ).spawn( 'npm', [] );
    var buffer = [];
    npm.stdout.on( 'data', function( data ){
        buffer.push( data );
    });
    npm.on( 'close', function( code ){
        if ( code !== 0 ) {
            log.error( 'edp-core postinstall failed, code = %s', code );
            return;
        }

        // npm@1.4.4 /usr/local/share/npm/lib/node_modules/npm
        // npm@1.3.21 C:\Documents and Settings\Administrator\Application Data\npm\node_modules\npm
        var stdout = Buffer.concat( buffer ).toString( 'utf-8' );
        var pattern = /^npm@(\d+\.\d+\.\d+)\s+(.+)$/m;
        var match = pattern.exec( stdout );
        if ( match && match[ 2 ] ) {
            var npmdir = match[ 2 ].trim();
            var dstpath = path.join( __dirname, '..', 'node_modules', 'npm' ) ;

            if ( !fs.existsSync( dstpath ) ) {
                // Hard Links and Junctions
                // http://msdn.microsoft.com/en-us/library/windows/desktop/aa365006(v=vs.85).aspx
                try {
                    fs.symlinkSync( npmdir, dstpath );
                }
                catch( ex ) {
                    if ( ex.code === 'ENOSYS' || ex.code === 'EISDIR' ) {
                        // 创建软链接失败了，拷贝一份儿吧
                        // http://stackoverflow.com/questions/19517429/how-to-copy-a-folder-via-cmd
                        var cp = require( './util' ).spawn( 'xcopy', [
                            npmdir, dstpath, '/s/i/h/e/k/c'
                        ] );
                        cp.stderr.on( 'data', function( data ){
                            log.error( data.toString() );
                        });
                        cp.stdout.on( 'data', function( data ){
                            // IGNORE
                        });
                        cp.on( 'close', function( code ){
                            // IGNORE
                        });
                    }
                }
            }
        }
    });
}

if ( require.main === module ) {
    main();
}




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

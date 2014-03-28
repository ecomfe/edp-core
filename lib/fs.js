/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * ../edp-core/fs.js ~ 2014/02/12 21:42:57
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
var fs = require( 'fs' );

/**
 * 读取文件的内容，返回utf-8编码的东东
 * @param {string} file 文件路径.
 * @param {string=} fileEncoding 指定的文件编码.
 *
 * @return {string}
 */
exports.readFileSync = function( file, fileEncoding) {
    var data = fs.readFileSync( file );
    if (!fileEncoding) {
        if (exports.isBinary( data )) {
            return data;
        }
        else {
            // 默认编码
            fileEncoding = 'UTF-8';
        }
    }

    if (fileEncoding) {
        var iconv = require( 'iconv-lite' );

        if ( /^utf-?8$/i.test( fileEncoding ) ) {
            // 删除UTF-8文件BOM
            if ( data[ 0 ] === 0xEF && data[ 1 ] === 0xBB && data[ 2 ] === 0xBF ) {
                data = data.slice( 3 );
            }

            return data.toString( fileEncoding );
        }
        else if ( iconv.encodingExists( fileEncoding ) ) {
            return iconv.decode( data, fileEncoding );
        }
        else {
            return data;
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

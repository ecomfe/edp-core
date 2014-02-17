/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * path.js ~ 2014/02/12 21:39:09
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 路径相关的一些函数
 **/

/**
 * 判断url是否本地路径
 *
 * @param {string} url 路径
 * @return {boolean}
 */
exports.isLocalPath = function( url ) {
    // url("//www.baidu.com/img/logo.gif")
    // url("http://www.baidu.com/img/logo.gif")
    // url("https://www.baidu.com/img/logo.gif")
    return !( /^\/\//.test( url ) || /^[a-z]{2,10}:/i.test( url ) );
};

(function () {
    function normalize( sourcePath ) {
        return sourcePath.replace( /\\/g, '/' );
    }

    var path = require( 'path' );

    [
        'normalize',
        'join',
        'resolve',
        'relative',
        'dirname',
        'basename',
        'extname'
    ].forEach(
        function ( method ) {
            exports[ method ] = function () {
                 return normalize( 
                    path[ method ].apply( path, arguments ) 
                );
            };
        }
    );
})();


/**
 * 判断路径片段是否满足规则
 * 
 * @inner
 * @param {string} pathTerm 路径片段
 * @param {string} patternTerm 规则片段
 * @return {boolean} 
 */
function pathTermSatisfy( pathTerm, patternTerm ) {
    var negate = false;
    if ( patternTerm.indexOf( '!' ) === 0 ) {
        negate = true;
        patternTerm = patternTerm.slice( 1 );
    }

    var pattern = new RegExp( 
        '^'
        + patternTerm
            .replace( /\./g, '\\.' )
            .replace( /\*/g, '.*' )
            .replace( /\?/g, '.' )
        + '$'
    );

    var isMatch = pattern.test( pathTerm );
    negate && ( isMatch = !isMatch );
    return isMatch;
}


/**
 * 判断路径是否满足规则
 * 
 * @param {string} path 源路径
 * @param {string} pattern 路径规则
 * @param {fs.Stats=} fileStat 路径所代表的文件状态对象
 * @return {boolean}
 */
exports.satisfy = function ( path, pattern, fileStat ) {
    // If the pattern ends with a “/”
    // it would only find a match with a directory
    if ( pattern.lastIndexOf( '/' ) === pattern.length - 1 ) {
        pattern = pattern.slice( 0, pattern.length - 1 );
        if ( fileStat && (!fileStat.isDirectory()) ) {
            return false;
        }
    }

    // A leading “/” matches the beginning of the pathname
    var matchBeginning = false;
    if ( pattern.indexOf( '/' ) === 0 ) {
        matchBeginning = true;
        pattern = pattern.slice( 1 );
    }

    // Satisfy terms one by one
    var pathTerms = path.split( '/' );
    var patternTerms = pattern.split( '/' );
    var patternLen = patternTerms.length;
    var pathLen = pathTerms.length;
    while ( patternLen-- ) {
        pathLen--;

        if ( pathLen < 0 
            || (!pathTermSatisfy( 
                    pathTerms[ pathLen ], 
                    patternTerms[ patternLen ] 
                )) 
        ) {
            return false;
        }
    }

    // match path beginning
    if ( matchBeginning && pathLen !== 0 ) {
        return false;
    }

    return true;
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

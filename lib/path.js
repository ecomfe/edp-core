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

var fs = require('fs');
var path = require('path');

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

/**
 * 以给定的目录为起点，获取项目或包的根目录
 *
 * @param {string} [cwd] 指定开始查找的目录，默认为当前目录
 * @return {string}
 */
exports.getRootDirectory = function (cwd) {
    // 有`.edpproj`文件夹的就是项目根目录，有`package.json`的是包根目录，
    // 但是由于存在`node_modules`这种文件夹，里面会有其它的`package.json`，
    // 因此包根目录的查找并不是非常精准的
    //
    // 出于这个问题，项目根目录找的是最近的那个目录，而包的根目录找的是最远的那个
    var projectRoot = path.resolve(cwd || process.cwd());
    var packageRoot = null;
    var systemRoot = path.resolve('/');
    while (projectRoot !== systemRoot) {
        // 如果是项目根就直接返回，不用再找了
        if (fs.existsSync(path.join(projectRoot, '.edpproj'))) {
            return projectRoot;
        }

        // 包根目录记录后不直接返回，还要继教往上找
        if (fs.existsSync(path.join(projectRoot, 'package.json'))) {
            packageRoot = projectRoot;
        }

        projectRoot = path.resolve(projectRoot, '..');
    }

    if (packageRoot) {
        return packageRoot;
    }
    else {
        throw new Error('未找到项目/包文件夹，请确保当前目录在项目/包内');
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */

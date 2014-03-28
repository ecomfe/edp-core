/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * lib/glob.js ~ 2014/03/24 15:27:28
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 文件或者Module Id过滤的操作
 **/
var path = require( './path' );

/**
 * @see {https://github.com/ecomfe/edp/issues/187}
 *
 * new MyProcessor({
 *   fileset: [
 *    'dep/** /*.js',
 *    '!dep/esui/** /extension/*.js',
 *    'dep/esui/** /extension/TableEdit.js'
 *   ]
 * })
 *
 * 1. 对于include的pattern来说，从allCandidates选择，然后放到结果的集合里面去
 * 2. 对于exclude的pattern来说，从结果的集合里面排除.
 *
 * @param {Array.<string>} patterns fileset的pattern.
 * @param {Array.<*>} allCandidates 所有的待选项.
 * @param {(function(string, *):boolean)=} comparator 用来判断是否符合要求的函数，如果符合返回true.
 *
 * @return {Array.<*>}
 */
exports.filter = function( patterns, allCandidates, comparator ) {
    var result = [];
    var util = require( 'util' );

    comparator = comparator || function( pattern, item ) {
        if ( util.isRegExp( pattern ) ) {
            return pattern.test( item );
        }
        else {
            return path.satisfy( item, pattern );
        }
    };

    for ( var i = 0; i < patterns.length; i ++ ) {
        var pattern = patterns[ i ];
        if ( pattern[ 0 ] === '!' ) {
            pattern = pattern.substring( 1 );
            // exclude pattern
            var len = result.length;
            while( len -- ) {
                if ( true === comparator( pattern, result[ len ] ) ) {
                    result.splice( len, 1 );
                }
            }
        }
        /* jshint ignore:start */
        else {
            // include pattern
            allCandidates.forEach(function( item ){
                if ( result.indexOf( item ) !== -1 ) {
                    return;
                }

                if ( true === comparator( pattern, item ) ) {
                    result.push( item );
                }
            });
        }
        /* jshint ignore:end */
    }

    return result;
};

/**
 * @param {string} item 需要检查的项目.
 * @param {Array.<string>} patterns pattern的集合.
 *
 * @return {boolean}
 */
exports.match = function( item, patterns ) {
    if ( patterns.length <= 0 ) {
        return false;
    }

    for ( var i = 0; i < patterns.length; i ++ ) {
        if ( path.satisfy( item, patterns[ i ] ) ) {
            return true;
        }
    }

    return false;
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */

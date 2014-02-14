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




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * lib/log.js ~ 2014/02/09 22:43:54
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * trace (the least serious); debug; info; warn; error; fatal (the most serious).
 **/
var chalk = require('chalk');

var log = {};
var fns = [
    {name: 'trace', color: chalk.grey, level: 0},
    {name: 'debug', color: chalk.grey, level: 1},
    {name: 'info', color: chalk.green, level: 2},
    {name: 'warn', color: chalk.yellow, level: 3},
    {name: 'error', color: chalk.red, level: 4},
    {name: 'fatal', color: chalk.red, level: 5}
];

fns.forEach(function(item){
    /**
     * @param {string} format 要输出的内容.
     * @param {...*} var_args 变长参数.
     */
    log[item.name] = function(format, var_args) {
        var util = require('util');

        var msg = util.format.apply(null, arguments);
        console.log('edp ' + item.color(item.name) + ' ' + msg);
    }
});

module.exports = log;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

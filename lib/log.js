/**
 * lib/log.js ~ 2014/02/09 22:43:54
 * @author leeight(liyubei@baidu.com)
 * @ignore
 * trace (the least serious); debug; info; warn; error; fatal (the most serious).
 **/

/**
 * @ignore
 */
var chalk = require('chalk');

/**
 * @class log
 */
var log = {};

/**
 * 打印trace级别的日志
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.trace = function( format, var_args ) {
    var args = [].slice.call( arguments, 0 );
    impl.apply( null, [ chalk.red( 'TRACE' ) ].concat( args ) );
};

/**
 * 打印debug级别的日志
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.debug = function( format, var_args ) {
    var args = [].slice.call( arguments, 0 );
    impl.apply( null, [ chalk.red( 'DEBUG' ) ].concat( args ) );
};

/**
 * 打印info级别的日志
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.info = function( format, var_args ) {
    var args = [].slice.call( arguments, 0 );
    impl.apply( null, [ chalk.green( 'INFO' ) ].concat( args ) );
};

/**
 * 打印warn级别的日志
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.warn = function( format, var_args ) {
    var args = [].slice.call( arguments, 0 );
    impl.apply( null, [ chalk.yellow( 'WARN' ) ].concat( args ) );
};

/**
 * 打印error级别的日志
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.error = function( format, var_args ) {
    var args = [].slice.call( arguments, 0 );
    impl.apply( null, [ chalk.red( 'ERROR' ) ].concat( args ) );
};

/**
 * 打印fatal级别的日志
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.fatal = function( format, var_args ) {
    var args = [].slice.call( arguments, 0 );
    impl.apply( null, [ chalk.red( 'FATAL' ) ].concat( args ) );
};

/**
 * @ignore
 */
var flag = {
    set: function(){
        global._edp_core_log_flag = true;
    },
    has: function(){
        return (global._edp_core_log_flag === true);
    },
    clear: function(){
        global._edp_core_log_flag = false;
    }
};

/**
 * @ignore
 * @param {string} name 日志级别的名称.
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
function impl( name, format, var_args ) {
    if ( process.env.EDP_LOG_SLIENT === '1' ) {
        return;
    }

    if ( flag.has() ) {
        console.log();
        flag.clear();
    }

    var util = require( 'util' );

    var args = [].slice.call( arguments, 1 );
    var msg = util.format.apply( null, args );
    if ( msg ) {
        console.log( 'edp ' + name + ' ' + msg );
    }
    else {
        console.log();
    }
};

/**
 * 清除最后一行输出的内容.
 * 配合edp.log.write来使用.
 */
log.clear = function() {
    if (typeof process.stdout.clearLine === 'function') {
        process.stdout.clearLine();
    }

    if (typeof process.stdout.cursorTo === 'function') {
        process.stdout.cursorTo(0);
    }

    flag.clear();
};

/**
 * 输出一行日志，大部分情况下不换行，但是如果发现没有
 * <code>process.stdout.clearLine</code>方法的话，就会自动添加一个换行.
 *
 * @param {string} format 要输出的内容.
 * @param {...*} var_args 变长参数.
 */
log.write = function(format, var_args) {
    log.clear();

    var util = require('util');

    var msg = util.format.apply(null, arguments);
    if (msg) {
        process.stdout.write(msg);

        if (typeof process.stdout.clearLine !== 'function') {
            process.stdout.write('\n');
        }
        flag.set();
    }
}

/**
 * @ignore
 */
module.exports = exports = log;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

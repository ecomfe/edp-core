/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * esl.spec.js ~ 2014/02/27 15:05:18
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var fs = require('fs');
var path = require('path');

var esl = require( '../lib/esl' );


describe("esl", function(){
    it("resolveModuleId", function(){
        expect( esl.resolveModuleId( './main.tpl.html', 'common/require-tpl' ) ).toBe( 'common/main.tpl.html' );
    });
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

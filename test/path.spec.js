/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * path.spec.js ~ 2014/03/20 14:17:28
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var path = require( '../lib/path' );

describe('path', function (){
    it('default', function(){
        expect( path.satisfy( 'er/main', 'er/*' ) ).toBe( true );
        expect( path.satisfy( 'er/main/123', 'er/*' ) ).toBe( false );
        // FIXME(user)
        // expect( path.satisfy( 'er/main/123', 'er/**' ) ).toBe( true );
    });
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

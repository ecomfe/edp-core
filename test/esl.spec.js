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
var fs = require( 'fs' );
var path = require('path');

var esl = require( '../lib/esl' );


describe('esl', function(){
    it('resolveModuleId', function(){
        expect( esl.resolveModuleId( './main.tpl.html', 'common/require-tpl' ) ).toBe( 'common/main.tpl.html' );
    });

    it('getAllModules', function(){
        var moduleConfig = './data/dummy-project/module.conf';
        var allModules = esl.getAllModules( moduleConfig );
        allModules.sort();

        var expected = [ 'bar', 'case1', 'common/main', 'er', 'er/View', 'er/main', 'etpl-2.0.8', 'foo' ];
        expect( allModules ).toEqual( expected );
    });

    it('getModuleFile', function () {
        var moduleConfig = path.resolve( __dirname, 'data/dummy-project/module.conf' );
        var testDir = path.resolve( __dirname );

        expect( esl.getModuleFile('main', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/dummy-project/src/main.js' ) );
        expect( esl.getModuleFile('hello', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/dummy-project/src/bar/hello.js' ) );
        expect( esl.getModuleFile('hello/hy', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/dummy-project/src/bar/hello/hy.js' ) );
        expect( esl.getModuleFile('er', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/dummy-project/dep/er/3.0.2/src/main.js' ) );
        expect( esl.getModuleFile('er/test', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/dummy-project/dep/er/3.0.2/src/test.js' ) );
        expect( esl.getModuleFile('moment', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/dummy-project/dep/moment/2.0.0/src/moment.js' ) );
        expect( esl.getModuleFile('io', moduleConfig) )
            .toBe( path.resolve( testDir, 'data/base/io/1.0.0/src/main.js' ) );
    });

    it('getModuleId', function () {
        var projectDir = path.resolve( __dirname, 'data/dummy-project' );
        var moduleConfig = path.resolve( projectDir, 'module.conf' );

        expect( esl.getModuleId(path.resolve(projectDir,'src/main.js'), moduleConfig) )
            .toEqual( ['main'] );
        expect( esl.getModuleId(path.resolve(projectDir,'src/common/config.js'), moduleConfig) )
            .toEqual( ['common/config'] );
        expect( esl.getModuleId(path.resolve(projectDir,'src/bar/hello.js'), moduleConfig) )
            .toEqual( ['hello','bar/hello'] );
        expect( esl.getModuleId(path.resolve(projectDir,'src/bar/hello/hy.js'), moduleConfig) )
            .toEqual( ['hello/hy','bar/hello/hy'] );
        expect( esl.getModuleId(path.resolve(projectDir,'dep/er/3.0.2/src/main.js'), moduleConfig) )
            .toEqual( ['er','er/main'] );
        expect( esl.getModuleId(path.resolve(projectDir,'dep/er/3.0.2/src/test.js'), moduleConfig) )
            .toEqual( ['er/test'] );
        expect( esl.getModuleId('dep/er/3.0.2/src/test.js', moduleConfig) )
            .toEqual( ['er/test'] );
    });

    it( 'toUrl', function(){
        var projectDir = path.resolve( __dirname, 'data/dummy-project' );
        var moduleConfigFile = path.resolve( projectDir, 'module.conf' );

        var moduleId = 'io/File';
        var baseId = null;
        var baseFile = path.resolve( projectDir, 'src', 'foo.js' );
        expect( esl.toUrl( moduleId, baseId, baseFile, moduleConfigFile ).file ).toBe(
            path.resolve( __dirname, 'data/base/io/1.0.0/src/File.js' ) );

        moduleId = 'tpl!./tpl/list.tpl.html';
        baseId = 'case1';
        baseFile = path.resolve( projectDir, 'src', 'case1.js' );

        var result = esl.toUrl( moduleId, baseId, baseFile, moduleConfigFile );
        expect( result.file ).toBe( path.resolve( __dirname, 'data/dummy-project/src/tpl.js' ) );
        expect( result.resource ).toBe( path.resolve( __dirname, 'data/dummy-project/src/tpl/list.tpl.html.js' ) );

        moduleId = 'no-such-plugin!./tpl/list.tpl.html';
        baseId = 'case1';
        baseFile = path.resolve( projectDir, 'src', 'case1.js' );

        var result = esl.toUrl( moduleId, baseId, baseFile, moduleConfigFile );
        expect( result.file ).toBe( path.resolve( __dirname, 'data/dummy-project/src/no-such-plugin.js' ) );
        expect( result.resource ).toBe( path.resolve( __dirname, 'data/dummy-project/src/tpl/list.tpl.html.js' ) );
    });
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */

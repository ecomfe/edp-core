/**
 * @file 根据模块Id获取模块的文件路径
 * @author errorrik[errorrik@gmail.com]
 */
var path = require( '../path' );
var fs = require( '../fs' );


/**
 * 获取module id
 * 
 * @param {string} moduleFile module文件路径
 * @param {string} moduleConfigFile module配置文件路径
 * @return {Array.<string>}
 */
module.exports = exports = function ( moduleFile, moduleConfigFile ) {
    var moduleConfig = JSON.parse( fs.readFileSync( moduleConfigFile ) );

    var relativePath = path.relative(
        path.dirname( moduleConfigFile ),
        moduleFile.replace( /\.js$/, '' )
    );

    var resultModules = [];
    var resultModulesMap = {};
    function addModule( moduleId ) {
        if ( !resultModulesMap[ moduleId ] ) {
            resultModulesMap[ moduleId ] = 1;
            resultModules.push( moduleId );
        }
    }

    // try match packages
    var packages = moduleConfig.packages || [];
    for ( var i = 0; i < packages.length; i++ ) {
        var pkg = packages[ i ];
        var pkgName = pkg.name;
        var pkgMain = pkg.main || 'main';
        var pkgLoc = pkg.location;

        if ( !path.isRelativePath( pkgLoc ) ) {
            continue;
        }

        if ( relativePath.indexOf( pkgLoc + '/' ) === 0 ) {
            if ( relativePath === pkgLoc + '/' + pkgMain ) {
                addModule( pkgName );
            }
            else {
                addModule( pkgName + relativePath.replace( pkgLoc, '' ) );
            }
        }
    }

    // try match paths
    var paths = moduleConfig.paths || {};
    var pathKeys = Object.keys( paths ).slice( 0 );
    pathKeys.sort( function ( a, b ) { return paths[b].length - paths[a].length; } );
    for ( var i = 0; i < pathKeys.length; i++ ) {
        var key = pathKeys[ i ];
        var modulePath = paths[ key ];

        if ( !path.isRelativePath( modulePath ) ) {
            continue;
        }

        if ( (new RegExp('^' + modulePath + '(/|$)')).test( relativePath ) ) {
            var moduleId = relativePath.replace( modulePath, key );
            addModule( moduleId );
        }
    }

    // try match baseUrl
    var baseUrl = moduleConfig.baseUrl + '/';
    if ( relativePath.indexOf( baseUrl ) === 0 ) {
        addModule( relativePath.replace( baseUrl, '' ) );
    }

    return resultModules;
};

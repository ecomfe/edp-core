/**
 * @author leeight@gmail.com
 * @ignore
 */



require( 'fs' ).readdirSync( __dirname + '/lib' ).forEach(
    function ( file ) {
        if ( /\.js$/.test( file ) ) {
            file = file.replace( /\.js$/, '' );
            exports[ file ] = require( './lib/' + file );
        }
    }
);



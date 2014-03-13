/**
 * @file util spec
 * @author treelite(c.xinle@gmail.com)
 */

var path = require('path');
var util = require('../lib/util');

describe('util', function () {

    describe('readJSONFile', function () {

        it('should return json from a file', function () {
            var data = util.readJSONFile(path.resolve('./data/util/normal.json'));

            expect(Object.keys(data).length).toBe(1);
            expect(data.name).toEqual('edp-core');
        });

        it('should return json from a file with BOM', function () {
            var data = util.readJSONFile(path.resolve('./data/util/bomb.json'));

            expect(Object.keys(data).length).toBe(1);
            expect(data.name).toEqual('edp-core');
        });
        
    });

});

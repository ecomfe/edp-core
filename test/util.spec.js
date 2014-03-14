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

    describe('rmdir', function () {

        var fs = require('fs');

        var baseDir = path.resolve('./data/rmdir');

        beforeEach(function () {
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir);
            }
        });

        it('should remove not empty directory', function () {

            fs.writeFileSync(path.resolve(baseDir, 'foo.txt'), 'hello', 'utf-8');

            util.rmdir(baseDir);

            expect(fs.existsSync(baseDir)).toBeFalsy();
        });

        it('should remove nested directory', function () {

            fs.writeFileSync(path.resolve(baseDir, 'foo.txt'), 'hello', 'utf-8');
            fs.mkdirSync(path.resolve(baseDir, 'bar'));
            fs.writeFileSync(path.resolve(baseDir, 'bar/bar.txt'), 'world', 'utf-8');

            util.rmdir(baseDir);

            expect(fs.existsSync(baseDir)).toBeFalsy();
        });

    });

});

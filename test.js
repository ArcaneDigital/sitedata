const should = require('should');

const Sitedata = require('./lib/sitedata');

describe('Module options', () => {
    it('should require API token', () => {
        should.throws(() => new Sitedata({}));
    });
});

const should = require('should');
const proxy = require('proxyquire');
const sinon = require('sinon');
const qs = require('querystring');

const requestSpy = sinon.spy(() => ({
    body: JSON.stringify({
        data: [],
        links: {
            next: ''
        }
    })
}));
const module = proxy('./lib/sitedata', {
    got: requestSpy
});
const TEST_TOKEN = 'TEST_TOKEN';
const TEST_URL = 'arcane.ws';

describe('Module options', () => {
    it('should require API token', () => {
        should.throws(() => new module({}));
    });
});

describe('Metrics', () => {
    const sd = new module({ token: TEST_TOKEN });
    let result;

    beforeEach(async () =>  result = await sd.metric.index({ url: TEST_URL }));
    afterEach(async () => requestSpy.resetHistory());

    it('should make at least one request', () => {
        should(requestSpy.called).be.true();
    });

    it('should get called with the correct params', () => {
        const {
            args: [[
                urlParam
            ]]
        } = requestSpy;
        const [
            uri,
            queryParams
        ] = urlParam.split('?');
        const {
            match,
            page,
            token,
            url
        } = qs.parse(queryParams);

        should.equal(token, TEST_TOKEN);
        should.equal(url, TEST_URL);
        should.equal(page, '1');
        should.equal(match, 'contains');
    });
});

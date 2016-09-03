const fs      = require('fs');
const path    = require('path');
const expect  = require('chai').expect;
const convert = require('../../src/render/ast2dot').render;

const testPairs = [{
    "title": "renders the kitchensink",
    "input": "../parse/fixtures/kitchensink.json",
    "expectedOutput": "../parse/fixtures/kitchensink.dot"
}, {
    "title": "renders the empty state chart",
    "input": "../parse/fixtures/minimal.json",
    "expectedOutput": "../parse/fixtures/minimal.dot"
}, {
    "title": "renders broadcasts",
    "input": "../parse/fixtures/broadcasts.json",
    "expectedOutput": "../parse/fixtures/broadcasts.dot"
}];

describe('#ast2dot', () => {
    testPairs.forEach(pPair => it(pPair.title, () => {
        expect(
            convert(require(pPair.input))
        ).to.equal(
            fs.readFileSync(path.join(__dirname, pPair.expectedOutput), "utf-8")
        );
    }));
});

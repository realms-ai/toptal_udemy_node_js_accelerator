// import { describe, it } from 'node:test';
import { describe, it } from 'mocha';
import chai from 'chai';
import debug from 'debug';
const expect = chai.expect;
const log = debug('app:test:mocha');
describe('Practice Test', () => {
    const [num1, num2] = [2, 3];
    const num = num1 + num2;
    it('should add numbers correctly', () => {
        log('Testing adding number: ', num);
        expect(num).to.equal(5);
        expect(num).to.be.a('number');
        expect(num).not.to.equal(6);
    });
    it('should be a number', () => {
        log('Testing type of a number: ', num);
        expect(num).to.be.a('number');
    });
    it('should not be other number', () => {
        log('Testing addition should not be other than 5');
        expect(num).not.to.equal(6);
    });
});

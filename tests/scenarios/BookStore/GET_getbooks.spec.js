const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/BookStore/GET_getbooks.pages.js');
const config = require('../../utils/config')

module.exports = () => {
    // Write your test here
    describe("Test Get Books", () =>  {
        
        it('Success', (done) => {
            new pages().request( 
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });
        
    })
}
const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/User/GET_getalluser.pages.js');


module.exports = () => {
    // Write your test here
    describe("Test Get All User", () =>  {
        
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
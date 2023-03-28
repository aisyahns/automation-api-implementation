const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/User/GET_getuserbyuserid.pages.js');
const pagesLogin = require('../../pages/User/POST_login.pages');
const config = require('../../utils/config.js')

const userId = new config().env().userId

module.exports = () => {
    // Write your test here
    describe("Test Get User by UserID", () =>  {
        
        before((done) =>{
            new pagesLogin().request(
                function(err, res){
                    expect(res.status).to.equals(200);
                    token = res.body.token
                    done();
                })
        })

        it('Success get detail user by valid id', (done) => {
            new pages().request(userId, token,
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });
        
        it('Failed: get detail user with invalid id', (done) => {
            new pages().request('aaaa', token,
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body.message).to.equal('User not found!')
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it('Failed: get detail user with invalid token', (done) => {
            new pages().request(userId, 'aaaa',
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body.message).to.equal('User not authorized!')
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });
    })
}
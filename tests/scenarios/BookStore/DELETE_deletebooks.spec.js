const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/BookStore/DELETE_deletebooks.pages.js');
const pagesLogin = require('../../pages/User/POST_login.pages');
const pagesGetUserId = require('../../pages/User/GET_getuserbyuserid.pages');
const config = require('../../utils/config')

const userId = new config().env().userId

module.exports = () => {
    // Write your test here
    describe("Test Delete Books", () =>  {
        
        before('Get token', (done) => {
            new pagesLogin().request(
                (err, res) => {
                    expect(res.status).to.equals(200);
                    token = res.body.token;
                    done();
                }
            )
        })

        it('Success delete books', (done) => {
            new pages().request(userId, token, 
                (err, res) => {
                    expect(res.status).to.equals(204);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });

        it('Failed: delete books with invalid user id', (done) => {
            new pages().request('aaa', token, 
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it('Failed: delete books with invalid token', (done) => {
            new pages().request(userId, 'aaaa', 
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        after('Validate if the books is deleted', (done) => {
            new pagesGetUserId().request(userId, token, 
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body.books).to.deep.equal([])
                    done();
            })
        });  
        
    })
}
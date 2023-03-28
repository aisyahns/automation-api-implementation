const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/User/DELETE_deletebyuserid.pages.js');
const pagesRegister = require('../../pages/User/POST_register.pages');
const pagesLogin = require('../../pages/User/POST_login.pages');
const helper = require('../../helper/general.helper')

module.exports = () => {
    // Write your test here
    describe("Test Delete by UserID", () =>  {

        before('Get user id to be deleted', function(done){
            username = new helper().randomUsername();
            new pagesRegister().request({ userName: username },
                function(err, res){
                    expect(res.status).to.equals(201);
                    userId = res.body.userID;
                    done();
                }
            )
        })

        before('Get token', function(done){
            new pagesLogin().request({userName: username}, 
                function(err, res){
                    expect(res.status).to.equal(200);
                    token = res.body.token;
                    done();
                })
        })

        it('Failed: delete with invalid token', (done) => {
            new pages().request(userId, 'aaaa',
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body.message).to.equal('User not authorized!')
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it('Success delete valid user id', (done) => {
            new pages().request(userId, token,
                (err, res) => {
                    expect(res.status).to.equals(204);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });

        it('Failed: delete with invalid user id', (done) => {
            new pages().request('aaaa', token,
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body.message).to.equal('User Id not correct!')
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });
        
    })
}
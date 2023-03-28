const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/User/POST_register.pages.js');
const pagesLogin = require('../../pages/User/POST_login.pages');
const pagesDeleteUser = require('../../pages/User/DELETE_deletebyuserid.pages');
const helper = require('../../helper/general.helper')

// If you need data driven, just write driven keys (no need all keys), for example
let data = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { userName: "", password: "", }, response: { case: "Failed: Username and password null", status: 400, message: "UserName and Password required." } },
    { ddt: { userName: "", }, response: { case: "Failed: Username null", status: 400, message: "UserName and Password required." } },
    { ddt: { password: "", }, response: { case: "Failed: Password null", status: 400, message: "UserName and Password required." } },
    { ddt: { password: "Password123", }, response: { case: "Failed: Password without special character", status: 400, message: "one special character" } },
    { ddt: { password: "Password!@#", }, response: { case: "Failed: Password without number", status: 400, message: "one digit ('0'-'9')," } },
    { ddt: { password: "1233545!!", }, response: { case: "Failed: Password without alphabet", status: 400, message: "must have at least one non alphanumeric character," } },
    { ddt: { password: "pass12!!", }, response: { case: "Failed: Password without uppercase", status: 400, message: "one uppercase ('A'-'Z')," } },
    { ddt: { password: "PASS12!!", }, response: { case: "Failed: Password without lowercase", status: 400, message: "one lowercase ('a'-'z')," } },
    { ddt: { password: "Pass12", }, response: { case: "Failed: Password less than 8 char", status: 400, message: "Password must be eight characters or longer." } },
    { ddt: { password: "Password123!", }, response: { case: "Failed: User exist", status: 406, message: "User exists!" } },
]

module.exports = () => {
    // Write your test here
    describe("Test Register", () =>  {
        
        data.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body.message).to.contain(datas.response.message);
                        expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                        done();
                })
            });
        })

        it("Success register new account", (done) =>{
            username = new helper().randomUsername()
            new pages().request( { userName: username },
                function(err, res){
                    expect(res.status).to.equals(201);
                    expect(res.body.username).to.equal(username)
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    userId = res.body.userID;
                    done();
                })
        })
        
        after("Login the registered user", (done) =>{
            new pagesLogin().request({ userName: username },
                function(err, res){
                    expect(res.status).to.equal(200);
                    token = res.body.token;
                    done();
                })
        })

        after("Delete the registered user", (done) => {
            new pagesDeleteUser().request(userId, token,
                function(err, res){
                    expect(res.status).to.equal(204);
                    done();
                })
        })
    })
}
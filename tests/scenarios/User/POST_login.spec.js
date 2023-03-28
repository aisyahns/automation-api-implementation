const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/User/POST_login.pages.js');
const config = require('../../utils/config')

// If you need data driven, just write driven keys (no need all keys), for example
let dataNull = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { userName: "", password: ""}, response: { case: "Failed: Username and password null", status: 400 } },
    { ddt: { password: ""}, response: { case: "Failed: Password null", status: 400 } },
    { ddt: { userName: ""}, response: { case: "Failed: Username null", status: 400 } },
]

let dataInvalid = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { password: "Password123"}, response: { case: "Failed: Password wrong", status: 200 } },
    { ddt: { userName: "automation12345"}, response: { case: "Failed: User unregistered", status: 200 } },
]

module.exports = () => {
    // Write your test here
    describe("Test Login", () =>  {
        
        dataNull.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body.message).to.equals('UserName and Password required.');
                        expect(res.body).to.be.jsonSchema(new pages().expect('null'))
                        done();
                })
            });
        })

        dataInvalid.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body.result).to.equals('User authorization failed.');
                        expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                        done();
                })
            });
        })
        
        it('Success login with valid account', (done) =>{
            new pages().request(
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body.result).to.equal('User authorized successfully.')
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
                })
        })
    })
}
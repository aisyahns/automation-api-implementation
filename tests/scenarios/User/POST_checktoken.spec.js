const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/User/POST_checktoken.pages.js');

// If you need data driven, just write driven keys (no need all keys), for example
let data = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { userName: "" }, response: { case: "Failed: Password null", status: 400 } },
    { ddt: { password: "" }, response: { case: "Failed: Username null", status: 400 } },
    { ddt: { userName: "", password: "" }, response: { case: "Failed: Username and password null", status: 400 } },
]

module.exports = () => {
    // Write your test here
    describe("Test Check Token", () =>  {
        
        data.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body.message).to.equals('UserName and Password required.');
                        expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                        done();
                })
            });
        })

        it("Failed: User unregistered", (done) => {
            new pages().request({ userName: "aaaa"}, 
                function (err, res) {
                    expect(res.status).to.equals(404);
                    expect(res.body.message).to.equals('User not found!');
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it("Success: User registered", (done) => {
            new pages().request(
                function (err, res) {
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });
        
    })
}
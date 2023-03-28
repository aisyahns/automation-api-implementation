const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/File/POST_uploadimage.pages.js');

// If you need data driven, just write driven keys (no need all keys), for example
let data = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { attachment: {"file": "tests/data/file/example.txt"} }, response: { case: "Success upload with file only", schema: "success", status: 200 } },
    { ddt: { additionalMetadata: { "data" : 10 }, attachment: {"file": "tests/data/file/example.txt"} }, response: { case: "Success upload with file and body", schema: "success", status: 200 } },
    { ddt: { additionalMetadata: { "data" : 10 } }, response: { case: "Success upload with body only", schema: "success", status: 200 } },
]

module.exports = () => {
    // Write your test here
    describe("Test Upload Image", () =>  {
        
        data.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body).to.be.jsonSchema(new pages().expect(datas.response.schema))
                        done();
                })
            });
        })
        
    })
}
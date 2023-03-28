const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/BookStore/DELETE_deleteabook.pages.js');
const pagesGetBooks = require('../../pages/BookStore/GET_getbooks.pages');
const pagesLogin = require('../../pages/User/POST_login.pages');
const pagesDeleteBook = require('../../pages/BookStore/DELETE_deletebooks.pages');
const pagesCreateBook = require('../../pages/BookStore/POST_createbook.pages');
const pagesGetDetailUser = require('../../pages/User/GET_getuserbyuserid.pages');
const config = require('../../utils/config')
const helper = require('../../helper/general.helper')

const userId = new config().env().userId

// If you need data driven, just write driven keys (no need all keys), for example
let data = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { isbn: "", }, response: { case: "Failed: isbn null", status: 400, message: "ISBN supplied is not available in User's Collection!"} },
    { ddt: { userId: "", }, response: { case: "Failed: user id null", status: 401, message: 'User Id not correct!' } },
    { ddt: { userId: "aaaaa", }, response: { case: "Failed: random user id value", status: 401, message: 'User Id not correct!' } },
    { ddt: { isbn: "aaaaa", }, response: { case: "Failed: random isbn value", status: 400, message: "ISBN supplied is not available in User's Collection!" } },
]

module.exports = () => {
    // Write your test here
    describe("Test Delete a Book", () =>  {
        
        before('Get isbn', (done) => {
            new pagesGetBooks().request(
                (err, res) => {
                    expect(res.status).to.equal(200)
                    isbn = res.body.books[0].isbn
                    isbn2 = res.body.books[1].isbn
                    done();
                }
            )
        })

        before('Get token', (done) => {
            new pagesLogin().request(
                (err, res) => {
                    expect(res.status).to.equal(200)
                    token = res.body.token
                    done();
                }
            )
        })

        before('Delete book', (done) => {
            new pagesDeleteBook().request(userId, token,
                (err, res) => {
                    expect(res.status).to.equals(204);
                    done();
                }
            )
        })

        before('Create books', (done) => {
            new pagesCreateBook().request(token, { collectionOfIsbns: [ { isbn : isbn }, { isbn : isbn2 }]},
                (err, res) => {
                    expect(res.status).to.equals(201);
                    done();
                }
            )
        })

        data.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(token, datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body.message).to.equals(datas.response.message);
                        expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                        done();
                })
            });
        })
        
        it('Success delete a book', (done) => {
            new pages().request(token, { isbn : isbn }, 
                (err, res) => {
                    expect(res.status).to.equals(204);
                    done();
            })
        });

        after('Verify if the book is deleted', (done) => {
            new pagesGetDetailUser().request(userId, token,
                (err, res) => {
                    expect(res.status).to.equal(200)
                    expect(new helper().getValues(res, 'books.isbn')).to.not.contain(isbn)
                    done();
                }
            )
        })
        
    })
}
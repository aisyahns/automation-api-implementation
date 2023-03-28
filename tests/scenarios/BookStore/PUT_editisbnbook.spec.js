const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/BookStore/PUT_editisbnbook.pages.js');
const pagesLogin = require('../../pages/User/POST_login.pages');
const pagesDeleteBook = require('../../pages/BookStore/DELETE_deletebooks.pages');
const pagesCreateBook = require('../../pages/BookStore/POST_createbook.pages');
const pagesGetBooks = require('../../pages/BookStore/GET_getbooks.pages');
const pagesGetDetailUser = require('../../pages/User/GET_getuserbyuserid.pages');
const helper = require('../../helper/general.helper')
const config = require('../../utils/config')

const userId = new config().env().userId

// If you need data driven, just write driven keys (no need all keys), for example
let data = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    // { ddt: { userId: "", }, response: { case: "Failed: user id null", status: 400, message: "Request Body is Invalid!" } },
    // { ddt: { isbn: "", }, response: { case: "Failed: isbn null", status: 400, message: "Request Body is Invalid!" } },
    { ddt: { userId: "aaaaa", }, response: { case: "Failed: user id invalid", status: 401, message: "User Id not correct!" } },
    // { ddt: { isbn: "aaaaa", }, response: { case: "Failed: isbn invalid", status: 400, message: "ISBN supplied is not available in Books Collection!"} },
]

module.exports = () => {
    // Write your test here
    describe("Test Edit ISBN Book", () =>  {
        
        before('Get token', (done) => {
            new pagesLogin().request(
                (err, res) => {
                    expect(res.status).to.equals(200);
                    token = res.body.token;
                    done();
                }
            )
        })

        before('Delete books', (done) => {
            new pagesDeleteBook().requestDefault(token,
                (err, res) => {
                    expect(res.status).to.equals(204);
                    done();
                }
            )
        })

        before('Get isbn', (done) => {
            new pagesGetBooks().request(
                (err, res) => {
                    expect(res.status).to.equals(200);
                    isbn = res.body.books[0].isbn
                    isbn2 = res.body.books[1].isbn
                    done();
                }
            )
        })

        before('Create books', (done) => {
            new pagesCreateBook().request(token, { isbn: isbn },
                (err, res) => {
                    expect(res.status).to.equals(201);
                    done();
                }
            )
        })

        data.forEach((datas) => {
            it(datas.response.case, (done) => {
                new pages().request(isbn, token, datas.ddt, 
                    (err, res) => {
                        expect(res.status).to.equals(datas.response.status);
                        expect(res.body.message).to.equal(datas.response.message);
                        expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                        done();
                })
            });
        })

        it('Failed: invalid isbn that want to be edited', (done) => {
            new pages().request('aaaa', token, {isbn: isbn}, 
                (err, res) => {
                    expect(res.status).to.equals(400);
                    expect(res.body.message).to.equal('ISBN supplied is not available in User\'s Collection!');
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it('Failed: invalid token', (done) => {
            new pages().request(isbn, 'aaaa', {isbn: isbn}, 
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body.message).to.equal('User not authorized!');
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it('Failed: invalid new isbn', (done) => {
            new pages().request(isbn, token, {isbn: isbn}, 
                (err, res) => {
                    expect(res.status).to.equals(400);
                    expect(res.body.message).to.equal('ISBN supplied is not available in User\'s Collection!');
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });
        
        it('Success edit isbn book', (done) => {
            new pages().request(isbn, token, {isbn: isbn2}, 
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body.books[0].isbn).to.equal(isbn2);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });
        
        after('Validate the edited book is saved', (done) => {
            new pagesGetDetailUser().request(userId, token,
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(new helper().getValues(res, 'books.isbn')).to.not.contain(isbn)
                    expect(new helper().getValues(res, 'books.isbn')).to.contain(isbn2)
                    done();
                }
            )
        })
    })
}
const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/BookStore/POST_createbook.pages.js');
const pagesGetBooks = require('../../pages/BookStore/GET_getbooks.pages');
const pagesDeleteBook = require('../../pages/BookStore/DELETE_deletebooks.pages');
const pagesLogin = require('../../pages/User/POST_login.pages');
const config = require('../../utils/config')

const userId = new config().env().userId

// If you need data driven, just write driven keys (no need all keys), for example
let data = [
    // Example data driven, some default keys need exist: ddt, response, attachment (if any)
    { ddt: { userId: "", }, response: { case: "Failed: user id null", status: 401, message: 'User Id not correct!' } },
    { ddt: { isbn: "", }, response: { case: "Failed: isbn null", status: 400, message: 'ISBN supplied is not available in Books Collection!' } },
    { ddt: { isbn: "aaaa", }, response: { case: "Failed: invalid isbn", status: 400, message: 'ISBN supplied is not available in Books Collection!' } },
    { ddt: { userId: "aaaa", }, response: { case: "Failed: invalid user id", status: 401, message: 'User Id not correct!' } },
]

module.exports = () => {
    // Write your test here
    describe("Test Create Book", () =>  {
        
        before('Get isbn', (done) => {
            new pagesGetBooks().request(
                (err, res) => {
                    expect(res.status).to.equal(200)
                    isbn = res.body.books[0].isbn;
                    done();
                }
            )
        })

        before('Get token', (done) => {
            new pagesLogin().request(
                (err, res) => {
                    expect(res.status).to.equal(200)
                    token = res.body.token;
                    done();
                }
            )
        })

        before('Delete book', (done) => {
            new pagesDeleteBook().requestDefault(token,
                (err, res) => {
                    expect(res.status).to.equals(204);
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

        it('Failed: invalid token', (done) => {
            new pages().request('aaaa', 
                (err, res) => {
                    expect(res.status).to.equals(401);
                    expect(res.body.message).to.equals('User not authorized!');
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });

        it('Success create book with valid isbn', (done) => {
            new pages().request(token, { isbn: isbn }, 
                (err, res) => {
                    expect(res.status).to.equals(201);
                    expect(res.body.books[0].isbn).to.equal(isbn);
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });

        it('Failed: create book that has been added', (done) => {
            new pages().request(token, { isbn: isbn}, 
                (err, res) => {
                    expect(res.status).to.equals(400);
                    expect(res.body.message).to.equals('ISBN already present in the User\'s Collection!');
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });
        
    })
}
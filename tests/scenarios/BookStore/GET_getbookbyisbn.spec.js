const expect = require('chai').expect
const chai = require('chai')
chai.use(require('chai-json-schema'))
const pages = require('../../pages/BookStore/GET_getbookbyisbn.pages.js');
const pagesGetBooks = require('../../pages/BookStore/GET_getbooks.pages');
const config = require('../../utils/config')

module.exports = () => {
    // Write your test here
    describe("Test Get Book by ISBN", () =>  {
        
        before((done) => {
            new pagesGetBooks().request(
                (err, res) => {
                    expect(res.status).to.equals(200);
                    isbn = res.body.books[0].isbn;
                    done();
                }
            )
        })

        it('Success get book with valid isbn', (done) => {
            new pages().request(isbn,
                (err, res) => {
                    expect(res.status).to.equals(200);
                    expect(res.body.isbn).to.equal(isbn)
                    expect(res.body).to.be.jsonSchema(new pages().expect('success'))
                    done();
            })
        });

        it('Failed: get book with invalid isbn', (done) => {
            new pages().request('aaaa',
                (err, res) => {
                    expect(res.status).to.equals(400);
                    expect(res.body.message).to.equal('ISBN supplied is not available in Books Collection!')
                    expect(res.body).to.be.jsonSchema(new pages().expect('failed'))
                    done();
            })
        });
        
    })
}
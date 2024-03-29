class schema {
    json() {
        const json = 
        {
            "success":
            {
                "isbn": "9781491950296",
                "title": "Programming JavaScript Applications",
                "subTitle": "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
                "author": "Eric Elliott",
                "publish_date": "2014-07-01T00:00:00.000Z",
                "publisher": "O'Reilly Media",
                "pages": 254,
                "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flex",
                "website": "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
            },
            "failed":
            {
                "code": "1205",
                "message": "ISBN supplied is not available in Books Collection!"
            }
        }
        return json
    }
}

module.exports = schema
class schema {
    json() {
        const json = 
        {
            "success":
            {
                "userId": "99741930-b909-40b7-87cb-7fe0499e3122",
                "username": "automationName805",
                "books": [
                  {
                    "isbn": "9781449331818",
                    "title": "Learning JavaScript Design Patterns",
                    "subTitle": "A JavaScript and jQuery Developer's Guide",
                    "author": "Addy Osmani",
                    "publish_date": "2020-06-04T09:11:40.000Z",
                    "publisher": "O'Reilly Media",
                    "pages": 254,
                    "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",       
                    "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
                  }
                ]
              },
            "failed":
            { 
                "code": "1207", 
                "message": "Request Body is Invalid!" 
            }
        }
        return json
    }
}

module.exports = schema
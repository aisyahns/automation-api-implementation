class schema {
    json() {
        const json = 
        {
            "success":
            {
                "books":[{
                    "isbn":"9781449325862"
                    }]
            },
            "failed": 
            {
                "code":"1207",
                "message":"User Id not correct!"
            }
        }
        return json
    }
}

module.exports = schema
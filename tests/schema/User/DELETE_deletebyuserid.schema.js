class schema {
    json() {
        const json = 
        {
            "success":
            {},
            "failed": 
            {
                "code": "1207",
                "message": "User Id not correct!"
            }
        }
        return json
    }
}

module.exports = schema
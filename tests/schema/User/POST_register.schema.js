class schema {
    json() {
        const json = 
        {
            "failed":
            {
                "code": "1300",
                "message": "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
            },
            "success":
            {
                "userID": "98f3359b-c0b0-4046-a858-4fd8dc3c0d6a",
                "username": "a1",
                "books": []
            }
        }
        return json
    }
}

module.exports = schema
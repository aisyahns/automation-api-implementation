class schema {
    json() {
        const json = 
        {
            "failed":
            { 
                "code": "1200", 
                "message": "User not authorized!" 
            }
        }
        return json
    }
}

module.exports = schema
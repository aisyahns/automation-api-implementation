class schema {
    json() {
        const json = 
        {
            "success":
                true,
            "failed":
            {
                "code": "1207",
                "message": "User not found!"
            }
        }
        return json
    }
}

module.exports = schema
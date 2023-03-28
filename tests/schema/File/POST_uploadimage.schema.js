class schema {
    json() {
        const json = 
        {
            "success":
            {
                "code": 200,
                "type": "unknown",
                "message": "additionalMetadata: {\"data\":1}\nFile uploaded to ./report.csv, 5 bytes"
              },
            "failed":
            {
                "example": "" 
            }
        }
        return json
    }
}

module.exports = schema
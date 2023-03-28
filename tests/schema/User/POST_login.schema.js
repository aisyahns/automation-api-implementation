class schema {
    json() {
        const json = 
        {
            "success":
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImF1dG9tYXRpb25OYW1lODA1IiwicGFzc3dvcmQiOiJQYXNzd29yZDEyMyEiLCJpYXQiOjE2NzY1Mjk5NzN9.2TINWr57JGgRIs_U8NfNoDczddIQDswI_MCw4lzoq_k",
                "expires": "2023-02-23T06:46:13.362Z",
                "status": "Success",
                "result": "User authorized successfully."
            },
            "failed":
            {
                "token": null,
                "expires": null,
                "status": "Failed",
                "result": "User authorization failed."
            },
            "null":
            {
                "code": "1200",
                "message": "UserName and Password required."
            }
        }
        return json
    }
}

module.exports = schema
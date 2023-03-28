const dotenv = require('dotenv')

class config {
    constructor() {
        // Write your constructor here, if you need 
    }

    env() {
        // change according to your need
        dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

        // Defining an object named 'env', contained your variables needed
        const env = {
            host: process.env.MAIN,
            username: process.env.USER_NAME,
            password: process.env.PASSWORD,
            userId: process.env.USER_ID
        }
    
        return env
    }

}
module.exports = config
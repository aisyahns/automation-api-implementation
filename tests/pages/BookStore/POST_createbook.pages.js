const chai = require('chai')
chai.use(require('chai-http'))
const schema = require('../../schema/BookStore/POST_createbook.schema.js');
const requestHelper = require('../../helper/request.helper.js');
const config = require('../../utils/config.js')

const userId = new config().env().userId

class pages {
    constructor() {
		// Write your constructor here, if you need
		this.api = chai.request(new config().env().host) // Set up the api with the endpoint based on the environment and change this according to endpoint service
		this.path = "/BookStore/v1/Books" // Set up the API path to the route endpoint
    }

    // This method handles making the HTTP request based on given arguments.
    request(...args) {
		// Send HTTP POST request to the specified path and send the required body with params extracted from args.
		const response = this.api.post(this.path)
		.set("accept", "application/json")
		.set("Authorization", "Bearer " + args[0])
		.set("Content-Type", "application/json")
		.send(this.body(new requestHelper().getParam(args)))
		// Finally, end the request by returning expected behavior by analyzing input args
		.end(new requestHelper().getExpectFunc(args))
		
		// Return the complete response
		return response
    }
  
    // This method used for provide body or payload of the request and return object
    body(...args) {
		// your rawJSON body
		let obj = {
  "userId": userId,
  "collectionOfIsbns": [
    {
      "isbn": "string"
    }
  ]
}

		// mapping your changes
		new requestHelper().objectMapping(obj, args)

		// Return it
		return obj
    }

	// This method used for provide expectation and return json schema
    expect(cases="success") {
		return new requestHelper().getSchema(new schema().json(), cases)
    }
}

module.exports = pages
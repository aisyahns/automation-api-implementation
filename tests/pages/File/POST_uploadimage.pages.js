const chai = require('chai')
chai.use(require('chai-http'))
const schema = require('../../schema/File/POST_uploadimage.schema.js');
const requestHelper = require('../../helper/request.helper.js');
const config = require('../../utils/config.js')

class pages{
	constructor() {
		// Write your constructor here, if you need
		this.api = chai.request(new config().env().host) // Set up the api with the endpoint based on the environment and change this according to endpoint service
		this.path = "/v2/pet/1/uploadImage" // Set up the API path to the route endpoint
	}

    // This method handles making the HTTP request based on given arguments.
	request(...args) {
		let datas = new requestHelper().getParam(args)
		let attaches = new requestHelper().getAttach(args)

		// Send HTTP POST request to the specified path and send the required body with params extracted from args.
		let response = this.api.post(this.path)
		.set("Content-Type", "multipart/form-data")
		.set("accept", "application/json")

		Object.keys(this.body(datas)).forEach((key) => {
		response = response.field(key, JSON.stringify(this.body(datas)[key]))
		})

		Object.keys(this.attach(attaches)).forEach((at) => {
		if( typeof this.attach(attaches)[at] != 'object') {
			let att = new requestHelper().getFile(this.attach(attaches)[at])
			response = response.attach(at, att[0], att[1])
		} else {
			this.attach(attaches)[at].forEach((val) => {
			let att = new requestHelper().getFile(val)
			response = response.attach(at, att[0], att[1])
			})
		}
		})

		// Finally, end the request by returning expected behavior by analyzing input args
		return response.end(new requestHelper().getExpectFunc(args))
	}

    // This method used for provide body or payload of the request and return object
	body(...args) {
		// your rawJSON body
		let obj = {
			"additionalMetadata": { "data" : 1 }
		}

		// mapping your changes
		new requestHelper().objectMapping(obj, args)

		// Return it
		return obj
	}

	// This method used for provide attachment file and return object
	attach(...args) {
		// your rawJSON attachment
		let objAtt = {
			"file": "tests/data/file/example.txt"
		}

		// mapping your changes
		new requestHelper().objectMapping(objAtt, args)

		// Return it
		return objAtt
	}

	// This method used for provide expectation and return json schema
	expect(cases="success") {
		return new requestHelper().getSchema(new schema().json(), cases)
	}
}

module.exports = pages
const { faker } = require('@faker-js/faker');

class general {
    constructor() {
        // Write your constructor here, if you need 
    }
    
    randomUsername(){
        return "automationName" + faker.random.numeric(4);
    }

    getValues(res, pathKey){
        let path = pathKey.split('.')
        let objArr = res.body
        for (let i = 0; i < path.length - 1; i++){
            objArr = objArr[path[i]]
        }
        let result = objArr.map(a => a[path[path.length - 1]]);
        return result
    }

    getSet(res, pathKey){
        let path = pathKey.split('.')
        let objArr = res.body
        for (let i = 0; i < path.length - 1; i++){
            objArr = objArr[path[i]]
        }
        let result = new Set()
        for (let i = 0; i < objArr.length - 1; i ++){
            result.add(objArr[i][path[path.length-1]])
        }
        return result
    }
}

module.exports = general
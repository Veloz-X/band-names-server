const {v4: uuidvV4} = require('uuid');
class Band{
    constructor(name ='no-name',){
        this.id=uuidvV4();
        this.name = name;
        this.votes =0;
    }
}
module.exports = Band;
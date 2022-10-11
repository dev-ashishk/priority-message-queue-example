const { ExceptionMessages } = require("../utils");

class Message {
    constructor(signature, data) {
        if(!signature) throw Error(ExceptionMessages.NO_SIGNATURE);
        this.signature = signature;
        this.data = data;
    }
}

module.exports = { Message };
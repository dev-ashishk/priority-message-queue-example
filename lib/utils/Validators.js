const { ExceptionMessages } = require("./constants")

const validateConsumerConfig = (config) => {
    if(!config) throw Error(ExceptionMessages.NO_CONSUMER_CONFIG);
    if(!config.id) throw Error(ExceptionMessages.NO_ID);
    if(!config.signature) throw Error(ExceptionMessages.NO_SIGNATURE);
    if(!config.cb) throw Error(ExceptionMessages.NO_CALLBACK);
}

const validateMessage = (message) => {
    if(!message.signature) throw Error(ExceptionMessages.NO_SIGNATURE);
}

module.exports = {
    validateConsumerConfig,
    validateMessage
}
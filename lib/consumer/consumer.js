const { validateConsumerConfig } = require("../utils");

class Consumer {
    constructor(consumerConfig) {
        validateConsumerConfig(consumerConfig);
        this.signature = consumerConfig.signature;
        this.id = consumerConfig.id;
        this.dependsOn = consumerConfig.dependency;
        this.callback = consumerConfig.cb || this.callbackFn;
    }

    callbackFn() {}
}

module.exports = { Consumer }
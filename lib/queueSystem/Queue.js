const { ExceptionMessages, QueueConfig } = require("../utils");

class Queue {
    constructor(config = QueueConfig) {
        this.maxSize = config.SIZE;
        this.queue = [];
        this.removeMessage = this.removeMessage.bind(this);
    }

    async addMessage(message) {
        if(!message) throw Error(ExceptionMessages.EMPTY_MESSAGE)
        if(this.queue.length >= this.maxSize) throw Error(ExceptionMessages.QUEUE_EXHAUST_LIMIT)
        this.queue.push(message);
    }

    removeMessage() {
        this.queue.shift();
    }
}

module.exports = { Queue };

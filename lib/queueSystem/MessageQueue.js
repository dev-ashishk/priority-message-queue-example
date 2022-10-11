const {
    QueueConfig,
    MessageQueueConfig
} = require('../utils');
const { ConsumerManager } = require('../consumer');
const { Queue } = require('./Queue');
const { Message } = require('./Message');

class MessageQueue {
    constructor(config = MessageQueueConfig) {
        this.configuration = {
            ...QueueConfig,
            ...config
        }
        this.queue = new Queue(this.configuration);
        this.consumerManager = new ConsumerManager(this.queue);
    }

    pushMessage(message) {
        const messageInstance = new Message(message.signature, message.data)
        this.queue.addMessage(messageInstance).then(() => {
            this.consumerManager.triggerCallbacks(messageInstance);
        }).catch(err => {
            throw err;
        });
    }

    register(consumerConfig = null) {
        const unregister = this.consumerManager.register(consumerConfig);
        return {
            unregister
        };
    }
}

module.exports = { MessageQueue }
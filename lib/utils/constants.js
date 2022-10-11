const QueueConfig = {
    SIZE: 50
};

const MessageQueueConfig = {
    ...QueueConfig,
    defaultAck: false
};

Object.freeze(QueueConfig);
Object.freeze(MessageQueueConfig);

const ExceptionMessages = Object.freeze({
    NO_CONSUMER_CONFIG: "Consumer config is required to register.",
    NO_ID: "'id' is a required field",
    NO_SIGNATURE: "'signature' is a required field",
    NO_CALLBACK: "'callback' is a required field",
    EMPTY_MESSAGE: "Empty or null message is not allowed",
    QUEUE_EXHAUST_LIMIT: "Queue limit has been exhausted.",
    NO_QUEUE_CLASS_INSTANCE: "instance of class 'Queue' is required"
});

module.exports = {
    QueueConfig,
    MessageQueueConfig,
    ExceptionMessages
}
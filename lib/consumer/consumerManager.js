const { ExceptionMessages } = require("../utils");
const { Consumer } = require("./Consumer");

class ConsumerManager {
    constructor(queue) {
        if(!queue) throw Error(ExceptionMessages.NO_QUEUE_CLASS_INSTANCE);
        this.queue = queue;
        this.dependencyMap = {};
        this.consumerMap = {};
        this.consumers = []
    }
    
    resolveDependency(consumerConfig) {
        if(!this.dependencyMap[consumerConfig.signature]) {
            this.dependencyMap[consumerConfig.signature] = []
        }
        if(this.dependencyMap[consumerConfig.signature].length === 0) {
            this.dependencyMap[consumerConfig.signature].push(...consumerConfig.dependency)
            this.dependencyMap[consumerConfig.signature].push(consumerConfig.id);
        } else {
            const index = this.dependencyMap[consumerConfig.signature].indexOf(consumerConfig.id);
            const indexArray = consumerConfig.dependency.map(id => this.dependencyMap[consumerConfig.signature].indexOf(id));
            const putOnRight = consumerConfig.dependency.length == 0 ? false : indexArray.every(i => index >= i)
            if(index > -1) { // if id already exists
                this.dependencyMap[consumerConfig.signature].splice(index, 1);
                if(putOnRight) {
                    this.dependencyMap[consumerConfig.signature].push(consumerConfig.id)
                } else {
                    this.dependencyMap[consumerConfig.signature] = [consumerConfig.id].concat(this.dependencyMap[consumerConfig.signature])
                }
            } else { // if id doest not exists
                this.dependencyMap[consumerConfig.signature].push(consumerConfig.id);
                this.resolveDependency(consumerConfig)
            }
        }
    }

    register(consumerConfig) {
        this.resolveDependency(consumerConfig);
        const consumer = new Consumer(consumerConfig);
        if(!this.consumerMap[consumerConfig.signature]) {
            this.consumerMap[consumerConfig.signature] = []
        }
        this.consumerMap[consumerConfig.signature].push(consumer);
        return () => {
            this.consumerMap[consumerConfig.signature] = this.consumerMap[consumerConfig.signature]
            .filter(con => con.callback !== consumer.callback)
        }
    }

    triggerCallbacks(message) {
        let resp;
        if(this.dependencyMap[message.signature]) {
            this.dependencyMap[message.signature].reduce((acc, id) => {
                if(this.consumerMap[message.signature]) {
                    const consumer = this.consumerMap[message.signature].find(consumer => consumer.id === id);
                    if(consumer) {
                        acc.push(consumer)
                    }
                }
                return acc;
            }, []).forEach((consumer) => {
                resp = consumer.callback(message, resp, this.queue.removeMessage)
            })
        }
    }
}

module.exports = { ConsumerManager }
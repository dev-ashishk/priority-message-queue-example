### How to use it ??

```javascript
const { MessageQueue } = require("./lib");

const mq = new MessageQueue();

const consumeMessage = (diff) => (message, prevResponse, ack) => {
    console.log(`message --> ${diff}`, prevResponse);
    ack();
    return `${message.data.name} (${diff})`
}
const c3 = mq.register({
    id: 'B',
    dependency: ['C'],
    signature: 'amit',
    cb: consumeMessage("B")
})
const c1 = mq.register({
    id: 'A',
    dependency: ['B', 'C'],
    signature: 'amit',
    cb: consumeMessage("A")
});

const c2 = mq.register({
    id: 'C',
    dependency: [],
    signature: 'amit',
    cb: consumeMessage("C")
});

c2.unregister();

function pushMessage(count = 1) {
    for(let i = 0 ; i < count; i++) {
        mq.pushMessage({
            signature: 'amit',
            data: { 
                name: `Ashish - ${i}`       
            }
        })
    }
}
pushMessage(40);

```
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

//  console.log(mq.consumerManager);
 
 /**
  * Design an efficient in-memory queueing system with low latency requirements 
Functional specification: 
● Queue holds JSON messages 
● Allow subscription of consumers to messages that match a particular expression 
● Consumers register callbacks that will be invoked whenever there is a new message 
● Queue will have one producer and multiple consumers 
● Consumers might have dependency relationships between them. For ex, if there are three consumers A, B and C. One dependency relationship can be that C cannot consumer a particular message before A and B have consumed it. C -> (A,B) (-> means must process after) 
● Queue is bounded in size and completely held in-memory. Size is configurable.
● Provide retry mechanism to handle failures in message processing. 
How you will be evaluated: 
● Separation of concerns 
● Abstractions 
● Application of OO design principles 
● Testability 
● Code readability 
**/


// {
//     id: 'A',
//     dependency: ['B', 'C'],
//     signature: 'amit',
//     cb: () => {}
// }


// {
//     id: 'C',
//     dependency: [],
//     signature: 'amit'
// }

// {
//     id: 'B',
//     dependency: ['C'],
//     signature: 'amit'
// }

// "amit" -> "A -> B -> C"

// {
//     id: 'C',
//     dependency: ['B', 'A'],
//     signature: 'amit1'
// }

// {
//     id: 'B',
//     dependency: ['A'],
//     signature: 'amit1'
// }



// Event
// {
//     signature: 'amit',
//     data: {        
//     }
// }

// register expressions
// dynamic expressions?
// 
// Configure Queue size ( Default )


// QueueSystem.sendMessage({
//     signature: "amit",
//     data: {}
// })

// const consumer = Q.register({
//     id: 'A',
//     dependency: ['B', 'C'],
//     signature: 'amit',
//     cb: () => {}
// })

// consumer((message, ack) => {
//     ack();
// })


// A.   B.   C <- 
//   \. |. /
//      S


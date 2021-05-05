// Imports the Google Cloud client library
const {v1,PubSub} = require('@google-cloud/pubsub');
const log4js = require('log4js');
const log = log4js.getLogger();
log.level = 'all';
const {projectId,subscriptionName} = require('../../server/environment');


const pubSubClient = new PubSub({projectId});
const subClient = new v1.SubscriberClient();
//async
async function getSusbcription() {
  //Instantiates a client
  try {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const subscription = await pubSubClient.subscription(subscriptionName);
    // Create an event handler to handle messages
  const messageHandler = message => {
    let {id,data,attributes} = message;
    return {
      id: id,
      data: data,
      attributes:attributes
    }
    message.ack();
  };

  // Listen for new messages until timeout is hit
  let subs = await subscription.on('message', messageHandler);
  console.log("subs",subs);
  setTimeout(async() => {
    subscription.removeListener('message', messageHandler);
    return listen;
  },60 * 1000);

  } catch (error) {
    log.error(`Received errors while: ${error.message}`);
    process.exitCode = 1;
  }
}

//sync
async function synchronousPull() {
  const formattedSubscription = subClient.subscriptionPath(
    projectId,
    subscriptionName
  );

  // The maximum number of messages returned for this request.
  // Pub/Sub may return fewer than the number specified.
  const request = {
    subscription: formattedSubscription,
    maxMessages: 10,
  };

  // The subscriber pulls a specified number of messages.
  const [response] = await subClient.pull(request);

  // Process the messages.
  const ackIds = [];
  const elements = [];
  for (const message of response.receivedMessages) {
    let {data} = message.message;
    log.info(`Received message: ${data}`);
    let obj = JSON.parse(Buffer.from(data, 'base64').toString());
    elements.push(obj);
    ackIds.push(message.ackId);
  }

  if (ackIds.length !== 0) {
    // Acknowledge all of the messages. You could also ackknowledge
    // these individually, but this is more efficient.
    const ackRequest = {
      subscription: formattedSubscription,
      ackIds: ackIds,
    };
    await subClient.acknowledge(ackRequest);
  }
  return elements;
}

module.exports = {
  getSusbcription: synchronousPull
};

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');
const log4js = require('log4js');
const log = log4js.getLogger();
log.level = 'all';
const {projectId,subscriptionName,topicName} = require('../../server/environment');



log.info("PROJECT_ID ",projectId)
log.info("SUBSCRIPTION_NAME",subscriptionName)
log.info("TOPIC_NAME ",topicName)

async function saveTopic(body) {
  //Instantiates a client
  const pubSubClient = new PubSub({projectId});
  try {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(JSON.stringify(body));
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    return messageId;
  } catch (error) {
    log.error(`Received errorsss while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  saveTopic: saveTopic
};

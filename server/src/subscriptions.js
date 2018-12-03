const { PubSub }  = require('apollo-server');

const TASK_CREATED = 'UserCreated';

module.exports = {

    EVENTS: {
        TASK: { CREATED: TASK_CREATED }
    },
    pubSub: new PubSub()
}
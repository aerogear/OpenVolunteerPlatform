const { PubSub }  = require('apollo-server');

const USER_CREATED = 'UserCreated';

module.exports = {

    EVENTS: {
        USER: { CREATED: USER_CREATED }
    },
    pubSub: new PubSub()
}
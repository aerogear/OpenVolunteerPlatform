# Configuring AMQ Online for MQTT Messaging

Red Hat AMQ supports the MQTT protocol which makes it a suitable Pubsub technology for powering GraphQL subscriptions at scale. This document provides recommendations for 

* Configuring AMQ Online for MQTT messaging.
* Connecting to AMQ Online and using it as a pubsub within server applications.

## Terminology

[AMQ Online](https://access.redhat.com/documentation/en-us/red_hat_amq/7.2/html-single/using_amq_online_on_openshift_container_platform/index#assembly-intro-using-messaging) is a mechanism that allows developers to consume the features of Red Hat AMQ within OpenShift.

[Red Hat AMQ](https://access.redhat.com/documentation/en-us/red_hat_amq/7.3/html/introducing_red_hat_amq_7/about) provides fast, lightweight, and secure messaging for Internet-scale applications. AMQ Broker supports multiple protocols and fast message persistence.

[MQTT](http://mqtt.org/) stands for MQ Telemetry Transport. It is a publish/subscribe, extremely simple and lightweight messaging protocol.

## Prerequisites

* OpenShift Cluster
* AMQ Online is installed in the OpenShift cluster

AMQ Online has a vast number of configuration options which should be considered to suit the specific needs of your application. This section establishes some base guidelines for configuring AMQ Online for MQTT messaging, enabling GraphQL subscriptions.

At a minimum, the following steps must be done to enable MQTT messaging.

* Create an AddressSpace
* Create an Address
* Create a MessagingUser

## Create an AddressSpace

A user can request messaging resources by creating an address space. An address space is the first resource you must create. There are two types of address spaces `standard` and `brokered`. The `brokered` address space must be used for MQTT based applications. The following definition can be used to create a brokered address space.

```
apiVersion: enmasse.io/v1beta1
kind: AddressSpace
metadata:
  name: myaddressspace
spec:
  type: brokered
  plan: brokered-single-broker
```

Create the address space.

```
oc create -f brokered-address-space.yaml
```

Get the details of the address space.

```
oc get <address space name> -o yaml
```

The output will display information including various connection details for connecting applications.

See [Creating address spaces using the command line](https://access.redhat.com/documentation/en-us/red_hat_amq/7.2/html-single/using_amq_online_on_openshift_container_platform/index#create-address-space-cli-messaging) for more information.

## Create an Address

An address is part of an address space and represents a destination for sending and receiving messages. An address is created and used to represent a topic in MQTT terms. For MQTT, a `topic` address type must be used.

```
apiVersion: enmasse.io/v1beta1
kind: Address
metadata:
    name: myaddressspace.myaddress # must have the format <address space name>.<address name>
spec:
    address: myaddress
    type: topic
    plan: brokered-topic
```

Create the address using the command line.

```
oc create -f topic-address.yaml
```

In the [implementing subscription resolvers](#define-subscriptions-in-the-schema-and-implement-subscription-resolvers) guide, the usage of `pubsub.asyncIterator()` is described. An address must be created for each topic name passed into `pubsub.asyncIterator()`.

See [Creating addresses using the command line](https://access.redhat.com/documentation/en-us/red_hat_amq/7.2/html-single/using_amq_online_on_openshift_container_platform/index#create-address-cli-messaging) for more information.

## Create a MessagingUser

A messaging client connects using a MessagingUser. A MessagingUser specifies an authorization policy that controls which addresses may be used and the operations that may be performed on those addresses.

Users are configured as MessagingUser resources. Users can be created, deleted, read, updated, and listed.

```
apiVersion: user.enmasse.io/v1beta1
kind: MessagingUser
metadata:
  name: myaddressspace.mymessaginguser # must be in the format <address space name>.<username>
spec:
  username: mymessaginguser
  authentication:
    type: password
    password: cGFzc3dvcmQ= # must be Base64 encoded. Password is 'password'
  authorization:
    - addresses: ["*"]
      operations: ["send", "recv"]
```

Create the messaging user.

```
oc create -f my-messaging-user.yaml
```

An application can now connect to an AMQ Online address using this `MessagingUser`'s credentials. For more information see [AMQ Online User Model](https://access.redhat.com/documentation/en-us/red_hat_amq/7.2/html-single/using_amq_online_on_openshift_container_platform/index#con-user-model-messaging).

# Using GraphQL MQTT PubSub with AMQ Online

## Prerequisites

* OpenShift cluster
* AMQ Online is installed in the OpenShift cluster
* The appropriate AMQ Online resources are available for MQTT Applications (AddressSpace, Address, MessagingUser)

This guide describes how to use [`@aerogear/graphql-mqtt-subscriptions`](https://npm.im/@aerogear/graphql-mqtt-subscriptions) to connect to an AMQ Online address.

The connection details for an Address Space can be retrieved from the terminal.

```
oc get addressspace <addressspace> -o yaml
```

In most cases, there are two options for connecting to an AMQ Online address.

* Using the service hostname - Allows clients to connect from within the OpenShift cluster.
* Using the external hostname - Allows clients to connect from outside the OpenShift cluster.

## Connecting to an AMQ Online Address Using the Service Hostname

It is recommended that applications running inside OpenShift connect using the service hostname. The service hostname is only accessible within the OpenShift cluster. This ensures messages routed between your application and AMQ Online stay within the OpenShift cluster and never go onto the public internet.

The service hostname can be retrieved using the terminal.

```bash
oc get addressspace <addressspace name> -o jsonpath='{.status.endpointStatuses[?(@.name=="messaging")].serviceHost
```

The following code can be used to connect.

```js
const mqtt = require('mqtt')
const { MQTTPubSub } = require('@aerogear/graphql-mqtt-subscriptions')

const client = mqtt.connect({
  host: '<internal host name>',
  username: '<MessagingUser name>',
  password: '<MessagingUser password>',
  port: 5762,
})

const pubsub = new MQTTPubSub({ client })
```

### Connecting using TLS

When connecting via TLS, all messages between your application and the AMQ Online broker are encrypted.

```js
const mqtt = require('mqtt')
const { MQTTPubSub } = require('@aerogear/graphql-mqtt-subscriptions')

const host = '<internal host name>'

const client = mqtt.connect({
  host: host,
  servername: host,
  username: '<MessagingUser name>',
  password: '<MessagingUser password>',
  port: 5761,
  protocol: 'tls',
  rejectUnauthorized: false,
})

const pubsub = new MQTTPubSub({ client })
```

There are some additional options passed into `mqtt.connect`

* `servername` - When connecting to a message broker in OpenShift using TLS, this property must be set otherwise the connection will fail. The reason for this is because the messages are being routed through a proxy resulting in the client being presented with multiple certificates. By setting the `servername`, the client will use [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication) to request the correct certificate as part of the TLS connection setup.
* `protocol` - Must be set to `'tls'`
* `rejectUnauthorizated` - Must be set to false, otherwise the connection will fail. This tells the client to ignore certificate errors. Again, this is needed because the client is presented with multiple certificates and one of the certificates is for a different hostname than the one being requested, which normally results in an error.
* `port` - must be set to 5761 for tls connections to the service hostname.

## Connecting to an AMQ Online Address Using the External Hostname

The external hostname allows connections from outside the OpenShift cluster. This is useful for the following cases.

* Production applications running outside of OpenShift connecting and publishing messages.
* Quick Prototyping and local development. A non-production Address Space could be created, allowing developers to connect applications from their local environments.

The external hostname is typically TLS only for security reasons. It can be retrieved using the terminal.

```bash
oc get addressspace <addressspace name> -o jsonpath='{.status.endpointStatuses[?(@.name=="messaging")].externalHost
```

Connect to the external hostname using the same sample code in [Connecting using TLS](#connecting-using-tls). The only difference is that the `port` property must be set to `443`.

## Recommended Configuration Using Environment Variables

Using environment variables for the connection is the recommended approach.

```js
const mqtt = require('mqtt')
const { MQTTPubSub } = require('@aerogear/graphql-mqtt-subscriptions')

const host = process.env.MQTT_HOST || 'localhost'

const client = mqtt.connect({
  host: host,
  servername: host,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  port: process.env.MQTT_PORT || 1883,
  protocol: process.env.MQTT_PROTOCOL || 'mqtt',
  rejectUnauthorized: false,
})

const pubsub = new MQTTPubSub({ client })
```

In this example, the connection options can be configured using environment variables, but sensible defaults for the `host`, `port` and `protocol` are provided for local development.

## Troubleshooting MQTT Connection Issues

### Events

The `mqtt` module emits various events during runtime.
It recommended to add listeners for these events for regular operation and for troubleshooting.

```js
client.on('connect', () => {
  console.log('client has connected')
})

client.on('reconnect', () => {
  console.log('client has reconnected')
})

client.on('offline', () => {
  console.log('Client has gone offline')
})

client.on('error', (error) => {
  console.log(`an error has occurred ${error}`)
})
```

Read the [`mqtt documentation`](https://www.npmjs.com/package/mqtt) to learn about all of the events and what causes them.

### Configuration Issues

If your application is experiencing connection errors, the most important thing to check is the configuration being passed into `mqtt.connect`. Because your application may run locally or in OpenShift, it may connect using internal or external hostnames, and it may or may not use TLS, it's very easy to accidentally provide the wrong configuration.

The Node.js `mqtt` module does not report any errors if parameters such as `hostname` or `port` are incorrect. Instead, it will silently fail and allow your application to start without messaging capabilities.

It may be necessary to handle this scenario in your application. The following workaround can be used.

```js
const TIMEOUT = 10 // number of seconds to wait before checking if the client is connected

setTimeout(() => {
  if (!client.connected) {
    console.log(`client not connected after ${TIMEOUT} seconds`)
	// process.exit(1) if you wish
  }
}, TIMEOUT * 1000)
```

This code can be used to detect if the MQTT client hasn't connected. This can be helpful for detecting potential configuration issues and allows your application to respond to that scenario.

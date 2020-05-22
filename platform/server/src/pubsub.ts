import mqtt from 'mqtt';
import { PubSub } from 'apollo-server-express';
import { MQTTPubSub } from '@aerogear/graphql-mqtt-subscriptions';

export function getPubSub() {
  const mqttHost = process.env.MQTT_HOST

  if (mqttHost) {
    console.log('Using MQTT PubSub')
    const mqttOptions = {
      host: mqttHost,
      servername: mqttHost, // needed to work in OpenShift. Lookup SNI.
      username: process.env.MQTT_USERNAME || '',
      password: process.env.MQTT_PASSWORD || '',
      port: process.env.MQTT_PORT || '1883',
      protocol: process.env.MQTT_PROTOCOL || 'mqtt',
      rejectUnauthorized: false
    }

    // Types are broken
    const client = mqtt.connect(mqttHost, mqttOptions as any)

    console.log(`attempting to connect to messaging service ${mqttHost}`)

    client.on('connect', () => {
      console.log('connected to messaging service')
    })

    client.on('error', (error) => {
      console.log('error with mqtt connection')
      console.log(error)
    })

    return new MQTTPubSub({ client })
  }
  console.log('Using In Memory PubSub')
  return new PubSub()
}
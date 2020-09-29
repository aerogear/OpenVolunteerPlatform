import * as Kafka from 'node-rdkafka';
import { PubSubEngine } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { ObjectID } from 'mongodb';

export interface IKafkaOptions {
  topic: string
  host: string
  port: string
  modelName: string
}

export class KafkaSubEngine extends PubSubEngine {

  protected producer: Kafka.HighLevelProducer
  protected consumer: Kafka.KafkaConsumer
  protected options: IKafkaOptions

  private ee: EventEmitter;
  private subscriptions: { [key: string]: [string, (...args: any[]) => void] }
  private subIdCounter: number;

  constructor(options: IKafkaOptions) {
    super()
    this.options = options
    this.ee = new EventEmitter();
    this.subscriptions = {};
    this.subIdCounter = 0;
  }

  /** 
   * TODO:
   * This should throw an error once the issue below is solved.
   * https://github.com/aerogear/graphback/issues/1896#issuecomment-697569448
   */
  public async publish(channel: string, payload: any): Promise<void> {
    console.warn("Not implemented. Should not be called", channel, payload);
  }

  public async subscribe(channel: string, onMessage: (...args: any[]) => void, options?: Object): Promise<number> {
    console.info("Subscribing to ", channel)
    this.consumer = this.consumer || await this.createConsumer(this.options.topic)
    this.ee.addListener(channel, onMessage)
    this.subIdCounter = this.subIdCounter + 1
    this.subscriptions[this.subIdCounter] = [channel, onMessage]
    return Promise.resolve(this.subIdCounter)
  }

  public unsubscribe(index: number) {
    const [channel, onMessage] = this.subscriptions[index];
    console.info("Unsubscribing from ", channel)
    delete this.subscriptions[index]
    this.ee.removeListener(channel, onMessage);
  }

  public async close(): Promise<void> {
    let producerPromise: Promise<void>
    producerPromise = new Promise((resolve, reject) => {
      if (this.producer) {
        this.producer.disconnect((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }
    })
    let consumerPromise: Promise<void>
    consumerPromise = new Promise((resolve, reject) => {
      if (this.consumer) {
        this.consumer.disconnect((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }
    })
    return Promise.all([producerPromise, consumerPromise]).then()
  }

  brokerList() {
    return this.options.port ? `${this.options.host}:${this.options.port}` : this.options.host
  }

  private deserialiseMessage(message: any): any {
    return JSON.parse(message.toString())
  }

  private async createConsumer(topic: string): Promise<Kafka.KafkaConsumer> {
    // Create a group for each instance. The consumer will receive all messages from the topic
    const groupId = Math.random().toString(32);

    const consumer = new Kafka.KafkaConsumer({
      'group.id': `kafka-pubsub-${groupId}`,
      'metadata.broker.list': this.brokerList()
    },
      { "auto.offset.reset": "latest" });

    const channelName = this.options.modelName;
    const upperCasedChannelName = channelName.substring(0, 1).toUpperCase() + channelName.substring(1);

    consumer.on('data', (message) => {
      const parsedKey = this.deserialiseMessage(message.key);
      const id = new ObjectID(parsedKey.payload?.id);

      if (message.value) {
        const parsedMessage = this.deserialiseMessage(message.value);
        const header = message.headers![0];
        let operationType = "update";
        let operationName = 'updated';
        if (header.__op.toString() === 'c') { // create operation
          operationType = "create";
          operationName = "new";
        } 

        const topicName = `${operationType}_${channelName}`.toUpperCase();
        const event = {
          ...parsedMessage.payload,
          _id: id
        };

        operationName = `${operationName}${upperCasedChannelName}`;
        this.ee.emit(topicName, {
          [operationName]: event
        });
      } else {
        this.ee.emit(`DELETE_${channelName}`.toUpperCase(), {
          [`deleted${upperCasedChannelName}`]: {
            _id: id
          }
        });
      }
    })

    consumer.on('event.log', (event) => {
      console.debug(event);
    });

    return new Promise((resolve, reject) => {
      consumer.on('ready', () => {
        console.info("Subscribing to ", topic)
        consumer.subscribe([topic]);
        consumer.consume();
        resolve(consumer);
      })

      console.info("Connecting consumer ...")
      consumer.connect();
    })
  }
}

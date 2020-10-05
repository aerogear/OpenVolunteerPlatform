## OpenShift templates

### Steps

1. Create new project: `oc new-project <project-name>`
2. Deploy Mongo if needed: `./deploy-mongo.sh`. Otherwise connect to your running MongoDB cluster
3. Deploy Kafka if needed: `./deploy-kafka-dbz.sh`. Otherwise connect to your running Kafka service
4. Deploy Keycloak if needed: `./deploy-keycloak.sh`: Otherwise connect to a running Keycloak service
5. Deploy OVP: 
    See [Keycloak setup](../server/README.md) on how to setup Keycloak configurations via config maps.
     
    First define configration option to a running Mongo and Kafka services
    ```bash
    export MONGO_CONNECTION=<mongo-database>
    export MONGO_COLLECTION=<mongo-connection-string>
    export KAFKA_HOST=<kafka-host>
    export KAFKA_PORT=<kafka-port>
    ```
    where: 
        - `<mongo-database>` is your Mongo database name, defaults to `showcase`
        -  `<mongo-connection-string>` is the connection string to a running MongoDB, defaults to `mongodb://user:password@127.0.0.1:27017/showcase`
        -  `<kafka-host>` is the Kafka service host, defaults to `kafka`
        -  `<kafka-port>` Port of a running Kafka service, defaults to `9092`
     
    Then deploy the service with:
    ```bash
    ./deploy-ovp.sh
    ```

### Debezium connector initialisation in openshift 

Retrieve pods in the current project

```bash
oc get pods
NAME                       READY     STATUS    RESTARTS   AGE
debezium-connect-1-r6p22   1/1       Running   0          2m
kafdrop-1-bt8g7            1/1       Running   0          2m
kafka-1-dhl9w              1/1       Running   0          2m
mongodb-1-tnckz            1/1       Running   0          17m
zookeeper-1-26lg2          1/1       Running   0          2m
```


Register the Debezium Connector to run against the deployed MongoDB instance:


```bash
oc exec -i -c kafka <kafka-pod-name> -- curl -X POST \
    -H "Accept:application/json" \
    -H "Content-Type:application/json" \
    http://debezium-connect:8083/connectors -d @- <<'EOF'
{
    "name": "ovp",
    "config": {
        "connector.class" : "io.debezium.connector.mongodb.MongoDbConnector",
        "tasks.max" : "1",
        "mongodb.hosts" : "<mongo-host>",
        "mongodb.name" : "dbserver1",
        "mongodb.user" : "<mongo-user>",
        "mongodb.password" : "<mongo-password>",
        "database.whitelist" : "<mongo-database>",
        "database.history.kafka.bootstrap.servers" : "<kafka-url>",
        "transforms" : "unwrap",
        "transforms.unwrap.type": "io.debezium.connector.mongodb.transforms.ExtractNewDocumentState",
        "transforms.unwrap.drop.tombstones": false,
        "transforms.unwrap.operation.header": true
    }
}
EOF
```

Where:
    - `<mongo-host>` is the MongoDB replica set host
    - `<mongo-user>` is the MongoDB username
    - `<mongo-password>` is the MongoDB password
    - `<mongo-database>` is the MongoDB database
    - `<kafka-url>` is the Kafka bootstrap server url

### See Routes

```bash
oc get routes
```

The `open-volunteer-platform` route will contain two endpoints. 
  - `/admin` to see the admin interfac
  - `/graphql` the GraphQL API
  - `/` is the client APP 
See [Server Readme](../server/README.md) for more info on how to interact with API. 

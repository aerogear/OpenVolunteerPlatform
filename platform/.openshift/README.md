## OpenShift templates

### Steps

1. Create new project: `oc new-project <project-name>`
2. Deploy Mongo: `./deploy-mongo.sh`
3. Deploy Kafka if needed: `./deploy-kafka-dbz.sh`
4. Deploy Keycloak if needed: `./deploy-keycloak.sh`
5. Deploy OVP: `./deploy-ovp.sh`. 
   
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
        "mongodb.hosts" : "rs0/mongodb:27017",
        "mongodb.name" : "dbserver1",
        "mongodb.user" : "root",
        "mongodb.password" : "password",
        "database.whitelist" : "showcase",
        "database.history.kafka.bootstrap.servers" : "kafka:9092",
        "transforms" : "unwrap",
        "transforms.unwrap.type": "io.debezium.connector.mongodb.transforms.ExtractNewDocumentState",
        "transforms.unwrap.drop.tombstones": false,
        "transforms.unwrap.operation.header": true
    }
}
EOF
```

### See Routes

```bash
oc get routes
```

The `open-volunteer-platform` route will contain two endpoints. 
  - `/admin` to see the admin interfac
  - `/graphql` the GraphQL API 
See [Server Readme](../server/README.md) for more info on how to interact with API. 

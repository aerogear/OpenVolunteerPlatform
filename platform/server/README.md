# Open Volunteer Full Stack Server

Node.js implementation for GraphQL based API

## Integrations

- Graphback (Apollo GraphQL template)
- Keycloak (Authentication)
- Debezium and Kafka
- MongoDB

## Usage

This project has been created using Graphback. 
Run the project using the following steps:

- Install

```sh
yarn install
```

- Start the Mongo database and MQTT client

```sh
docker-compose up -d
```

- Start the server

```sh
yarn start:server
```

## Docker Image

Server comes with docker file that can be used to build ready to use image.
Reference application is actively tracked and pushed to docker registry

`docker.io/wtrocki/openvolunteer`

Docker image supports following environment variables:

```
## MongoDB connection
MONGO_USER=user
MONGO_PASSWORD=password
MONGO_ADMIN_PASSWORD=password
MONGO_DATABASE=showcase
MONGO_HOST=

## MQTT with AMQ
KAFKA_HOST=
KAFKA_PORT=

# Hack to enable keycloak with self signed certs
# don't do it in production
NODE_TLS_REJECT_UNAUTHORIZED=0 

BACKUP_DEMO_DATA=true
USE_DEMO_DATA=false
```
### Running together with required services

Example docker-compose that can be used to launch OpenVolunter application

```yaml
version: '3'
services:
  mongodb:
        image: bitnami/mongodb:latest
        container_name: "mongodb"
        environment:
          - MONGODB_USERNAME=user
          - MONGODB_PASSWORD=password
          - MONGODB_ROOT_PASSWORD=password
          - MONGODB_DATABASE=showcase
          - MONGODB_REPLICA_SET_MODE=primary
          - MONGODB_ADVERTISED_HOSTNAME=mongodb
          - MONGODB_REPLICA_SET_KEY=replicasetkey123
        ports:
            - 27017:27017
  keycloak:
    image: quay.io/keycloak/keycloak:9.0.3
    ports:
      - "8080:8080"
    environment:
      DB_VENDOR: h2
      KEYCLOAK_USER: ovp-admin
      KEYCLOAK_PASSWORD: ovp-admin
  zookeeper:
    image: debezium/zookeeper:1.3
    ports:
      - 2181:2181
      - 2888:2888
      - 3888:3888
  kafka:
    image: debezium/kafka:1.3
    ports:
      - 9092:9092
    links:
      - zookeeper
    environment:
      - ZOOKEEPER_CONNECT=zookeeper:2181
  connect:
    image: debezium/connect:1.3
    ports:
      - 8083:8083
    links:
      - kafka
      - mongodb
    environment:
      - BOOTSTRAP_SERVERS=kafka:9092
      - GROUP_ID=1
      - CONFIG_STORAGE_TOPIC=my_connect_configs
      - OFFSET_STORAGE_TOPIC=my_connect_offsets
      - STATUS_STORAGE_TOPIC=my_connect_statuses
  kafdrop:
    image: obsidiandynamics/kafdrop
    ports:
      - 9000:9000
    links:
      - kafka
      - mongodb
    environment:
      - KAFKA_BROKERCONNECT=kafka:9092
      - SERVER_SERVLET_CONTEXTPATH=/
      - JVM_OPTS=-Xms32M -Xmx64M

```

> NOTE: You need to execute `npm run keycloak:init` or import realm from ./integrations/keycloak/realm-export.json as in local machine to be able to use docker compose. When running the script, you can configure the Keycloak url through `KEYCLOAK_URL` which defaults to `http://localhost:8080/auth`. Also the script allows setting up the `ADMIN_USERNAME` and `ADMIN_PASSWORD`  environment variables which both defaults to `ovp-admin` otherwise.

This command will create the following usernames:

```log
hzaub	
kudi
msash
tgers
tmaure
ukon
wtrocki
```

The password is the same as the username.

You can use these user names to login into the volunteer client application. 

### Debezium Connector initialisation

```bash
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mongo-connector.json
```

Once that is done, go to Kafka UI: `http://localhost:9000/topic/dbserver1.showcase.volunteeraction` to see volunteeraction changes.

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
        "mongodb.user" : "user",
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


Where `<kafka-pod-name>` is the name of kafka pod. Taking the list of pods above, it will be `kafka-1-dhl9w` in that case.

### Deploying App On OpenShift

First create keycloak configuration json files config maps. 

For that modify the following files:

- `src/config/keycloak.json` 
- `../client-admin/public/keycloak.json`

So that that the configuration matches the one you have provisioned for OVP platform. 
Especially, make sure that the key `auth-server-url` points to your Keycloak server.

Once that is done, we can create the config maps from the two files by using the below command:


```bash
oc create configmap keycloak-config --from-file=server=src/config/keycloak.json --from-file=admin=../client-admin/public/keycloak.json --from-file=client=../client/public/keycloak.json
```

Verify that your config map:

```bash
oc get configmap keycloak-config -o yaml
```

After that we can deploy ovp server on OpenShift with
```bash
cd ../.openshift
./deploy-ovp.sh
```


### Simulating VolunteerEntry 

#### Creating (This represents the action of checking in the distribution centre by badging into a system)
  
Use the following mutation.

```graphql
mutation {
  createVolunteerEntry(
    input: {
      checkedInAt: "2020-10-02T13:40:54.927Z"
      volunteerActions: []
      volunteer: {
        _id: "5ef9c631da553f262c7a95dc"
        firstName: "Wojciech"
        lastName: "Trocki"
        email: "wtrocki@gmail.com"
        username: "wtrocki"
      }
      distributionCentre: {
        _id: "5ef740ac12f76aecc84af1f2"
        name: "Berlin City Hall"
      }
    }
  ) {
    _id
  }
}

```

Note the `_id` of the created volunteer entry. We'll use it during update. 

#### Updating
   
   
##### Add volunteer actions (This represents the action of picking up foods for deliveries)

```graphql
mutation {
  updateVolunteerEntry(
    input: {
      _id: "5f772e5c8c274bc5a8d8c070",
      volunteerActions: [
        {
          _id: "5efa273a93802a8fb60e8ac0",
          title: "Delivery to Childcare Center, Munze"
        },
        {
          _id: "5ef9c4f9da553f262c7a95d7",
          title: "Delivery to Eberswalde (Andi). "
        }
      ]
    }
  ) {
    _id,
    volunteerActions
  }
}
```   

##### Checkout the distribution centre (badging out / leaving)

```graphql
mutation {
  updateVolunteerEntry(
    input: {
      _id: "5f772e5c8c274bc5a8d8c070",
      checkedOutAt: "2020-10-02T14:00:54.927Z"
    }
  ) {
    _id
  }
}
```   
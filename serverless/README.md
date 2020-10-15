
## Deploy

### Create the handler for configmap

Modify the `handler.ts` file to suite your needs. 

1. Compile the project

```bash
yarn build
```
2. Create the configmap
```bash
oc create configmap knative-handler --from-file=handler=dist/handler.js
```

### Deploy the service

Define the MongoDB connection string 

```
MONGO_CONNECTION=mongodb://user:password@mongodb/showcase
./deploy.sh
```

### Get route of the deployed service

```bash
oc get ksvc | grep 'ovp-knative' | awk '{ print $2 }'
```
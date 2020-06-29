## OpenShift templates

### Starter App template

Name: `datasync-app-template.yml`

This template starts datasync container on top of the mongodb instances:

#### Prerequisites

1. Running MongoDB instance 
2. Connection details to MongoDB server

#### Steps

1. Add template to your openshift 
2. Provide MongoDB connection details
3. Wait for the pods to start

# Deploying Server with AMQ

Prerequisites

* AMQ Online is installed in the cluster


This section describes how to deploy the application in an OpenShift cluster by using the supplied `amq-topics.yml` template file.
* The template is already prefilled with all of the necessary values that can be inspected
* The only field you might want to change is `AMQ Messaging User Password`.
  * The default value is `Password1` in base64 encoding
  * The value *must* be base64 encoded
  * A custom value can be created in the terminal using `$ echo <password> | base64` 
* Execute template on your openshift instance by `oc process -f amq-topics.yml | oc create -f -`

The hostname for the AMQ Online Broker is only made available after the resources from the the template have been provisioned. One more step is needed to supply extra environment variables to running server.

* From the terminal, ensure you have the correct namespace selected.

```
oc project <project where template was provisioned>
```

* Update the deployment to add the `MQTT_HOST` variable. 

```
oc get addressspace datasync -o jsonpath='{.status.endpointStatuses[?(@.name=="messaging")].serviceHost}'
```

If you want to use service outside the OpenShift cluster please request external URL:
```
oc get addressspace datasync -o jsonpath='{.status.endpointStatuses[?(@.name=="messaging")].externalHost}'
```

Provide set of the environment variables required to connect to the running AMQ

```
MQTT_HOST=messaging-nj2y0929dk-redhat-rhmi-amq-online.apps.youropenshift.io 
MQTT_PORT=443 
MQTT_PASSWORD=Password1 
MQTT_USERNAME=messaging-user 
MQTT_PROTOCOL=tls 
```

Check `../server/.env` file for all available variables

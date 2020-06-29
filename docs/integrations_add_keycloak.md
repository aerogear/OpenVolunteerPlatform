## Prerequisites

- There is a Keycloak service available.
- You have provisioned a sync application using our playbook.
- oc tools must be installed
- You must first create a client for your application in the Keycloak Administration Console, and then click on the `Installation` tab, select `Keycloak OIDC JSON` for `Format` Option, and then click on `Download`. Save the downloaded `keycloak.json`.

## Connecting your application to Keycloak

Any application that connects to keycloak must consume a keycloak.json file.  This guide demonstrates how to add a keycloak.json file to your sync application deployment.  It will create the environment variable `KEYCLOAK_CONFIG` that contain the path to keycloak.json.  It is still your application's responsibility to consume this file.  We have provided an [example project](../../examples/keycloak).

## Create a Keycloak Secret

The following command will create a secret called `sync-keycloak-doc`.  It will contain one key, `keycloak` and a value, the text of your keycloak.json file.

```bash
oc create secret generic sync-keycloak-doc \
  --from-file=keycloak=./keycloak.json 
```

You can confirm this is successful with either `oc get secret sync-keycloak-doc` or by viewing your secret in the OpenShift console.

## Create a patch for your deployment configuration

This step requires patching the deployment config to create and mount a volume with the keycloak secret we just created.  Replace `$YOUR_DEPLOYMENT_CONFIG_NAME` in the following yaml section with the deployment config name of your sync application and save this file as `secret.yaml`.

```yaml
spec:
  template:
    spec:
      containers:
        - env:
          - name: KEYCLOAK_CONFIG
            value: /config/keycloak.json
          name: $YOUR_DEPLOYMENT_CONFIG_NAME
          volumeMounts:
            - name: secret-volume
              mountPath: /config
              readOnly: true
      volumes:
          - name: secret-volume
            secret:
              items:
                - key: keycloak
                  path: keycloak.json
              secretName: sync-keycloak-doc
```

## Apply the patch

After replacing `$YOUR_DEPLOYMENT_CONFIG_NAME` with the deployment config name, run the following command.  It patches the deployment configuration which triggers your application to reload.  

```
oc patch deploymentconfig $YOUR_DEPLOYMENT_CONFIG_NAME -p "$(cat secret.yaml)"
```

Once your application has reloaded, it should be able to read the keycloak.json file pointed to by the KEYCLOAK_CONFIG environment variable.

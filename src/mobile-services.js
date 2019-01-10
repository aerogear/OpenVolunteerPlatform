var config = {
  "version": 1,
  "clusterName": "",
  "namespace": "myproject",
  "clientId": "app-js",
  "services": [
    {
      "id": "5c09c179-142b-11e9-afb5-02cf927517aa",
      "name": "keycloak",
      "type": "keycloak",
      "url": "https://keycloak-admin-exam-mobi-f8e7.apps.mobile-7c21.openshiftworkshop.com/auth",
      "config": {
        "auth-server-url": "https://keycloak-admin-exam-mobi-f8e7.apps.mobile-7c21.openshiftworkshop.com/auth",
        "confidential-port": 0,
        "public-client": true,
        "realm": "admin-exam-mobi-f8e7",
        "resource": "app1-public",
        "ssl-required": "external"
      }
    },
    {
      "id": "fd08817f-142f-11e9-afb5-02cf927517aa",
      "name": "sync-app-todoapp",
      "type": "sync-app-disable",
      "url": "https://sync-app-admin-exam-mobi-f8e7.apps.mobile-7c21.openshiftworkshop.com/graphql",
      "config": {}
    }
  ]
}

module.exports = config
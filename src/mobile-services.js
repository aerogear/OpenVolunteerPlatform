var config = {
  "version": 1,
  "namespace": "admin-exam-mobi-f8e7",
  "clientId": "todoapp",
  "services": [
    {
      "id": "417d12f1-1586-11e9-afb5-02cf927517aa",
      "name": "keycloak",
      "type": "keycloak",
      "url": "https://keycloak-admin-exam-mobi-f8e7.apps.mobile-7c21.openshiftworkshop.com/auth",
      "config": {
        "auth-server-url": "https://keycloak-admin-exam-mobi-f8e7.apps.mobile-7c21.openshiftworkshop.com/auth",
        "confidential-port": 0,
        "public-client": true,
        "realm": "admin-exam-mobi-f8e7",
        "resource": "todoapp-public",
        "ssl-required": "external"
      }
    }
  
  ]
}

module.exports = config
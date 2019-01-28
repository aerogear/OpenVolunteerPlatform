let config = {
  "version": 1,
  "namespace": "voyager",
  "clientId": "voyager-ionic-example",
  "services": [
    {
      "id": "417d12f1-1586-11e9-afb5-02cf927517aa",
      "name": "keycloak",
      "type": "keycloak",
      "url": "https://keycloak-09271b-collab-project.comm2.skunkhenry.com/auth",
      "config": {
        "auth-server-url": "https://keycloak-09271b-collab-project.comm2.skunkhenry.com/auth",
        "confidential-port": 0,
        "public-client": true,
        "realm": "voyager-testing",
        "resource": "voyager-mobile-client",
        "ssl-required": "external"
      }
    }
  ]
};

module.exports = config;

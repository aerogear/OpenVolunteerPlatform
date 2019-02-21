let config = {
  "version": 1,
  "namespace": "voyager",
  "clientId": "voyager-ionic-example",
  "services": [{
    "id": "3a3e7a81-262a-11e9-bd5f-0af08791569c",
    "name": "keycloak-5e98cf",
    "type": "keycloak",
    "url": "https://keycloak-09271b-collab-project.comm2.skunkhenry.com/auth",
    "config": {
      "realm": "voyager-testing",
      "auth-server-url": "https://keycloak-09271b-collab-project.comm2.skunkhenry.com/auth",
      "ssl-required": "none",
      "resource": "voyager-mobile-client",
      "public-client": true,
      "confidential-port": 0
    }
  }]
};

module.exports = config;

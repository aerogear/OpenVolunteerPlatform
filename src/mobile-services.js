var config = {
  "version": 1,
  "clusterName": "https://192.168.37.1:8443",
  "namespace": "myproject",
  "clientId": "app-android-memeolist",
  "services": [
    {
      "id": "sync",
      "name": "sync",
      "type": "sync",
      "url": "http://192.168.0.12:8000/graphql",
      "config": {}
    }
  ]
}

module.exports = config
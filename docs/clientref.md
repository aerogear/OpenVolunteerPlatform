---
id: clientref
title: Mobile and Admin Apps
---
# React Client

React Web implementation for the Open Volunteer Platform 

## Getting Started

* [Running the Client in Developer Mode](#Running-the-Client-in-Developer-Mode)
* [Adding Keycloak Integration to the Client](#Adding-Keycloak-Integration-to-the-Client)
* [Customizing the Action Reports Grid](#Customizing-the-Action-Reports-Grid)
* [Customizing Action Report Nearby Distance](#Customizing-Action-Report-Nearby-Distance)

**Requirements:** 

* [Node.js 12.x](https://nodejs.org/en/download/current/) or later version
* Keycloak server (_Optional_) 

### Running the Client in Developer Mode

1. Install Ionic

```shell
npm install -g @ionic/cli
```

2.  Install dependencies

```shell
npm install
```

3.  Start the app

```shell
npm run dev
```

### Adding Keycloak Integration to the Client

Rename the `keycloak.example.json` to `keycloak.json` and update the fields accordingly.


```
{
  "realm": "<your realm>",
  "auth-server-url": "https://your-server/auth",
  "ssl-required": "none",
  "resource": "<your-client>",
  "public-client": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0
}
```

### Customizing the Action Reports Grid

* Column size can be customized by using  the `REACT_APP_REPORT_COLUMN_SIZE` environment variable. 
* This value can be changed in the `.env` file. 
* The default value is `4`.


### Customizing Action Report Nearby Distance

* Nearby distance to calculate actions reports depending on closeness of recipient location can be customized via `REACT_APP_NEARBY_MAX_DISTANCE` environment variable.
* This value can be changed in `.env` file. 
* The default value is `100` km.*

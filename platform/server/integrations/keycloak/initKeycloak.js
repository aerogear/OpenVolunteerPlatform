/**
 * This script helps set up a local keycloak environment
 * It assumes keycloak is already running and available at
 * http://localhost:8080
 * It does the following:
 * * Imports a new realm located in ./realm-export.json. This realm has two clients
 *   * open-volunteer-platform-public - public client used by the mobile application
 *   * open-volunteer-platform-bearer - bearer client used by the server to authenticate requests
 * * Creates the realm roles and client roles defined in the realmRoleNames and clientRoleNames lists
 * * Creates the users defined in the users list
 * * Assigns the client and realm roles to the users
 */

const axios = require('axios')
const realmToImport = require('./realm-export.json')

// the keycloak server we're working against
const KEYCLOAK_URL = 'http://localhost:8080/auth'

// name of the realm
const APP_REALM = 'open-volunteer-platform'

// name of the admin realm
const ADMIN_REALM = 'master'

const RESOURCE = 'admin-cli'
const ADMIN_USERNAME = 'ovp-admin'
const ADMIN_PASSWORD = 'ovp-admin'
let token = ''

// The keycloak client used by the sample app
const PUBLIC_CLIENT_NAME = 'open-volunteer-platform-public'
const BEARER_CLIENT_NAME = 'open-volunteer-platform-bearer'
let PUBLIC_CLIENT

const demoUsers = [
  {
    name: 'msash',
    password: 'msash',
    email: "msash@gmail.com",
    firstName: "Martina",
    lastName: "Sash",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  {
    name: 'kudi',
    password: 'kudi',
    email: "kudilauper@gmail.com",
    firstName: "Kudi",
    lastName: "Lauper",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  {
    name: 'tmaure',
    password: 'tmaure',
    email: "tmaure@gmail.com",
    firstName: "Thomas",
    lastName: "Mauer",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  {
    name: 'tgers',
    password: 'tgers',
    email: "tgerst@gmail.com",
    firstName: "Toya",
    lastName: "Gerst",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  {
    name: 'hzaub',
    password: 'hzaub',
    email: "hansza542@gmail.com",
    firstName: "Hans",
    lastName: "Zauber",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  {
    name: 'ukon',
    password: 'ukon',
    email: "ukonth@gmail.com",
    firstName: "Uwe",
    lastName: "Konth",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  {
    name: 'wtrocki',
    password: 'wtrocki',
    email: "wtrocki@gmail.com",
    firstName: "Wojciech",
    lastName: "Trocki",
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  }
];

// The client roles you want created for the BEARER_CLIENT_NAME client
const clientRoleNames = [
  'admin',
  'users'
]

// The realm roles we want for the realm
const realmRoleNames = [
  'admin',
  'users'
]

let realmRoles
let clientRoles

// The users we want to create
const users = [
  {
    name: 'ovp-admin',
    password: 'ovp-admin',
    realmRoles: [
      'admin'
    ],
    clientRoles: [
      'admin'
    ]
  },
  {
    name: 'developer',
    password: 'developer',
    realmRoles: [
      'users'
    ],
    clientRoles: [
      'users'
    ]
  },
  ...demoUsers
]

// This is called by an immediately invoked function expression
// at the bottom of the file
async function prepareKeycloak() {
  try {
    console.log('Authenticating with keycloak server')
    token = await authenticateKeycloak()

    // Always do a hard reset first just to keep things tidy
    console.log('Going to reset keycloak')
    await resetKeycloakConfiguration()

    console.log('Importing sample realm into keycloak')
    await importRealm()

    console.log('Fetching available clients from keycloak')
    const clients = await getClients()

    // Get the public client object from keycloak
    // Need this for the ID assigned by keycloak
    PUBLIC_CLIENT = clients.find((client) => client.clientId === PUBLIC_CLIENT_NAME)
    BEARER_CLIENT = clients.find((client) => client.clientId === BEARER_CLIENT_NAME)

    console.log('creating client roles')
    for (let roleName of clientRoleNames) {
      await createClientRole(BEARER_CLIENT, roleName)
    }

    console.log('creating realm roles')
    for (let roleName of realmRoleNames) {
      await createRealmRole(roleName)
    }

    // get the actual role objects from keycloak after creating them
    // need to get the ids that were created on them
    realmRoles = await getRealmRoles()
    clientRoles = await getClientRoles(BEARER_CLIENT)

    for (let user of users) {
      // Create a new user
      console.log(`creating user ${user.name} with password ${user.password}`)
      const userIdUrl = await createUser(user)

      // Assign roles to the user
      await assignRealmRolesToUser(user, userIdUrl)
      await assignClientRolesToUser(user, BEARER_CLIENT, userIdUrl)
    }

    const publicInstallation = await getClientInstallation(PUBLIC_CLIENT)

    console.log()
    console.log('Your keycloak server is set up for local usage and development')
    console.log()
    console.log('Copy the following app config into the following files:')
    console.log('- client/public/keycloak.json')
    console.log('- server/src/config/keycloak.json')
    console.log()
    console.log(JSON.stringify(publicInstallation, null, 2))
    console.log()
    console.log('Done. Please follow the instructions printed above to ensure your environment is set up properly.')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

async function getClientInstallation(client, installationType = 'keycloak-oidc-keycloak-json') {
  if (client) {
    const res = await axios({
      method: 'GET',
      url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/clients/${client.id}/installation/providers/${installationType}`,
      headers: { 'Authorization': token }
    })
    return res.data
  }
  throw new Error('client is undefined')
}

async function assignRealmRolesToUser(user, userIdUrl) {
  for (let roleToAssign of user.realmRoles) {
    console.log(`Assigning realm role ${roleToAssign} to user ${user.name}`)
    const selectedRealmRole = realmRoles.find(role => role.name === roleToAssign)

    if (selectedRealmRole) {
      await assignRealmRoleToUser(userIdUrl, selectedRealmRole)
    } else {
      console.error(`realm role ${roleToAssign} does not exist`)
    }
  }
}

async function assignClientRolesToUser(user, client, userIdUrl) {
  for (let roleToAssign of user.clientRoles) {
    console.log(`assigning client role ${roleToAssign} from client ${PUBLIC_CLIENT_NAME} on user ${user.name}`)
    const selectedClientRole = clientRoles.find(clientRole => clientRole.name === roleToAssign)
    if (selectedClientRole) {
      await assignClientRoleToUser(userIdUrl, client, selectedClientRole)
    } else {
      console.error(`client role ${roleToAssign} does not exist on client ${PUBLIC_CLIENT_NAME}`)
    }
  }
}

async function authenticateKeycloak() {
  const res = await axios({
    method: 'POST',
    url: `${KEYCLOAK_URL}/realms/${ADMIN_REALM}/protocol/openid-connect/token`,
    data: `client_id=${RESOURCE}&username=${ADMIN_USERNAME}&password=${ADMIN_PASSWORD}&grant_type=password`
  })
  return `Bearer ${res.data['access_token']}`
}

async function importRealm() {
  return await axios({
    method: 'POST',
    url: `${KEYCLOAK_URL}/admin/realms`,
    data: realmToImport,
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  })
}

async function getRealmRoles() {
  const res = await axios({
    method: 'GET',
    url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/roles`,
    headers: { 'Authorization': token }
  })
  return res.data
}

async function createClientRole(client, roleName) {
  try {
    return await axios({
      method: 'POST',
      url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/clients/${client.id}/roles`,
      headers: { 'Authorization': token },
      data: {
        clientRole: true,
        name: roleName
      }
    })
  } catch (e) {
    if (e.response.data.errorMessage === `Role with name ${roleName} already exists`) {
      console.log(e.response.data.errorMessage)
    } else {
      throw (e)
    }
  }
}

async function createRealmRole(roleName) {
  try {
    return await axios({
      method: 'POST',
      url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/roles`,
      headers: { 'Authorization': token },
      data: {
        clientRole: false,
        name: roleName
      }
    })
  } catch (e) {
    if (e.response.data.errorMessage === `Role with name ${roleName} already exists`) {
      console.log(e.response.data.errorMessage)
    } else {
      throw (e)
    }
  }
}

async function getClients() {
  const res = await axios({
    method: 'GET',
    url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/clients`,
    headers: { 'Authorization': token }
  })
  return res.data
}

async function getClientRoles(client) {
  const res = await axios({
    method: 'GET',
    url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/clients/${client.id}/roles`,
    headers: { 'Authorization': token }
  })
  return res.data
}

async function createUser({name, password, email, firstName, lastName}) {
  const res = await axios({
    method: 'post',
    url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}/users`,
    data: {
      'username': name,
      email,
      firstName,
      lastName,
      'credentials': [{ 'type': 'password', 'value': password, 'temporary': false }],
      'enabled': true
    },
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  })
  if (res) {
    return res.headers.location
  }
}

async function assignRealmRoleToUser(userIdUrl, role) {
  const res = await axios({
    method: 'POST',
    url: `${userIdUrl}/role-mappings/realm`,
    data: [role],
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  })
  return res.data
}

async function assignClientRoleToUser(userIdUrl, client, role) {
  const res = await axios({
    method: 'POST',
    url: `${userIdUrl}/role-mappings/clients/${client.id}`,
    data: [role],
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  })
  return res.data
}

async function resetKeycloakConfiguration() {
  try {
    await axios({
      method: 'DELETE',
      url: `${KEYCLOAK_URL}/admin/realms/${APP_REALM}`,
      headers: { 'Authorization': token }
    })
  } catch (e) {
    if (e.response.status !== 404) {
      throw e
    }
    console.log(`404 while deleting realm ${APP_REALM} - ignoring`)
  }
}

function getMobileServicesConfig(installationConfig) {
  return {
    id: 'some-id',
    name: 'keycloak',
    type: 'keycloak',
    url: KEYCLOAK_URL,
    config: installationConfig
  }
}

(async () => {
  await prepareKeycloak()
})()

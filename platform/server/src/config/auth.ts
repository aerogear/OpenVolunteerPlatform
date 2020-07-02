import { CrudServicesAuthConfig } from "@graphback/keycloak-authz"

export const authConfig: CrudServicesAuthConfig = {
  DistributionCentre: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
  Volunteer: {
    create: { roles: [] },
    read: { roles: [] },
    update: { roles: [] },
    delete: { roles: ['admin'] },
  },
  Recipient: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
  VolunteerAction: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: {roles: [] },
    delete: { roles: ['admin'] },
  },
  VolunteerActionProduct: {
    create: { roles: ['admin'] },
    read: { roles: [] },
    update: { roles: ['admin'] },
    delete: { roles: ['admin'] },
  },
}
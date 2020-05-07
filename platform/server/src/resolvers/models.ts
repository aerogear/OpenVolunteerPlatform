export const models = [
  {
    name: "DistributionCentre",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
  {
    name: "VolunteerAction",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
  {
    name: "Volunteer",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
  {
    name: "VolunteerActionProduct",
    pubSub: {
      publishCreate: false,
      publishUpdate: false,
      publishDelete: false,
    },
  },
  {
    name: "Product",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
  {
    name: "PrefferedProduct",
    pubSub: {
      publishCreate: false,
      publishUpdate: false,
      publishDelete: false,
    },
  },
  {
    name: "Recipient",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
]

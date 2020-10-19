import { DataStore } from 'offix-datastore';
import { wsUri, httpUri } from '../config/clientConfig';
import { schema, VolunteerAction } from './generated';

export const datastore = new DataStore({
  dbName: "offix-ovp",
  replicationConfig: {
    client: {
      url: httpUri,
      wsUrl: wsUri,
    },
    // Delta pooling every 2 minutes and when back from offline 
    delta: { enabled: true, pullInterval: 200000 },
    mutations: { enabled: true },
    liveupdates: { enabled: true }
  }
});

export const VolunteerActionModel = datastore.setupModel<VolunteerAction>(schema.VolunteerAction);

datastore.init();

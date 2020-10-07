
import { KeycloakCrudService, CrudServiceAuthConfig } from '@graphback/keycloak-authz'
import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService } from 'graphback';
import { createDataSyncCRUDService } from '@graphback/datasync';
import { KafkaSubEngine } from './KafkaSubEngine';
import { config } from './config/config';
import { ObjectID } from 'mongodb';


let volunteerEntryService: GraphbackCRUDService;
let volunteerActionService: GraphbackCRUDService;

/**
 * Creates Graphback service with following capabilities:
 * 
 * - DataSync
 * - Keycloak
 * - AMQ custom topics
 * 
 * @param authConfig 
 */
export function createKeycloakCRUDService(authConfig: CrudServiceAuthConfig) {
    return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
        const pubSub = new KafkaSubEngine({
            ...config.kafka,
            topic: `dbserver1.${config.db.database}.${model.graphqlType.name.toLowerCase()}`,
            port: config.kafka.port.toString(),
            modelName: model.graphqlType.name
        });

        const service = createDataSyncCRUDService({ pubSub })(model, dataProvider);

        if (model.graphqlType.name === "VolunteerEntry") {
            pubSub.subscribe('CREATE_VOLUNTEERENTRY', async (create) => {
               await assignVolunteerToAction(create.newVolunteerEntry);
            });

            pubSub.subscribe('UPDATE_VOLUNTEERENTRY', async (update) => {
                await assignVolunteerToAction(update.updatedVolunteerEntry);
            });
            volunteerEntryService = service;
        } else if (model.graphqlType.name === "VolunteerAction") {
            volunteerActionService = service; 
        } 
        
        const authService = new KeycloakCrudService(model, { service, authConfig });

        return authService;
    }
}

async function assignVolunteerToAction(payload) {
    if (!volunteerActionService || !volunteerEntryService) {
        return;
    }

    const volunteerActions = payload.volunteerActions || [];
    
    if (!volunteerActions.length) {
       return;  
    }

    const volunteerEntry = await volunteerEntryService.findOne({
        _id: new ObjectID(payload._id)
    });

    const volunteerId = new ObjectID(volunteerEntry.volunteer._id);
    return Promise.all(volunteerActions.map(( { _id }) => volunteerActionService.update({
        _id: new ObjectID(_id),
        volunteerId,
        status: 'ASSIGNED',
        assignedAt: new Date(),
        completedAt: null,
    })))
    .then((result) => {
       // log result 
       console.log(result)
    })
    .catch((error) => {
        // log error
        console.error(error)
    });
}
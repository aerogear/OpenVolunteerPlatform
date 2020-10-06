
import { KeycloakCrudService, CrudServiceAuthConfig } from '@graphback/keycloak-authz'
import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService } from 'graphback';
import { createDataSyncCRUDService, DataSyncCRUDService } from '@graphback/datasync';
import { KafkaSubEngine } from './KafkaSubEngine';
import { config } from './config/config';


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
        const service = createDataSyncCRUDService({
            pubSub
        })(model, dataProvider);
       
        const authService = new KeycloakCrudService(model, { service, authConfig });

        // TODO ugly hack for tricking graphback that this is datasync service
        (authService as any).__proto__ = DataSyncCRUDService.prototype
        return authService;
    }
}

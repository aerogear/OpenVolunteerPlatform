
import { KeycloakCrudService, CrudServiceAuthConfig } from '@graphback/keycloak-authz'
import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService } from 'graphback';
import { createDataSyncCRUDService } from '@graphback/datasync';
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
        const service = createDataSyncCRUDService({
            pubSub: new KafkaSubEngine({
                ...config.kafka,
                topic: `dbserver1.${config.db.database}.${model.graphqlType.name.toLowerCase()}`,
                port: config.kafka.port.toString(),
                modelName: model.graphqlType.name
            })
        })(model, dataProvider);
        const authService = new KeycloakCrudService(model, { service, authConfig });

        return authService;
    }
}

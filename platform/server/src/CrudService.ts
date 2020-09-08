
import { KeycloakCrudService, CrudServiceAuthConfig } from '@graphback/keycloak-authz'
import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService } from 'graphback';
import { createDataSyncCRUDService } from '@graphback/datasync';
import { getPubSub } from './pubsub';

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
    const pubSub = getPubSub();
    return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
        const service = createDataSyncCRUDService({
            pubSub
        })(model, dataProvider);
        const objConfig = authConfig[model.graphqlType.name];
        const authService = new KeycloakCrudService(model, { service, authConfig });

        return authService;
    }
}

import * as mutationOptions from './mutationOptions';
import * as subscriptionOptions from './subscriptionOptions';

export { ConflictLogger } from './ConflictLogger';

const { globalCacheUpdates } = mutationOptions;

export { 
  mutationOptions, 
  globalCacheUpdates, 
  subscriptionOptions, 
};

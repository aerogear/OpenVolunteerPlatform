import { APP_INITIALIZER, NgModule } from '@angular/core';
import { VoyagerService } from './services/sync/voyager.service';

function apolloClientFactory(aeroGear: VoyagerService) {
  return () => aeroGear.createApolloClient();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: apolloClientFactory,
      deps: [VoyagerService],
      multi: true
    }
  ]
})

export class GraphQLModule {}

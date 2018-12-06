import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AeroGear } from './services/aerogear';

function apolloClientFactory(aeroGear: AeroGear) {
  return () => aeroGear.createApolloClient();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: apolloClientFactory,
      deps: [AeroGear],
      multi: true
    }
  ]
})

export class GraphQLModule {}

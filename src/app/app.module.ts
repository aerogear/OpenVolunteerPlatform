import { WebSocketLink } from 'apollo-link-ws';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, GraphQLModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

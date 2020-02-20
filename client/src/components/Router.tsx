import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { TaskPage, AddTaskPage, OfflineQueuePage, UpdateTaskPage, ProfilePage } from '../pages';
import { KeycloakRoute } from '../auth/KeycloakRoute';

export const Router: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <KeycloakRoute path="/addTask" component={AddTaskPage} exact={true} />
          <KeycloakRoute path="/updateTask/:id" component={UpdateTaskPage} exact={true} />
          <KeycloakRoute path="/offlineQueue" component={OfflineQueuePage} exact={true} />
          <KeycloakRoute path="/tasks" component={TaskPage} exact={true} />
          <KeycloakRoute path="/profile" component={ProfilePage} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/tasks" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
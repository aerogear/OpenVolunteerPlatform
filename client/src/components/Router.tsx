import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useKeycloak } from '@react-keycloak/web';
import { TaskPage, AddTaskPage, OfflineQueuePage, UpdateTaskPage, ProfilePage } from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { Loading } from './Loading';
import { AppContext } from '../AppContext';

export const Router: React.FC = () => {
  const { initialized } = useKeycloak(); 
  const { keycloakEnabled } = useContext(AppContext);

  if (keycloakEnabled && !initialized) return <Loading loading={!initialized} />;
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <PrivateRoute path="/addTask" component={AddTaskPage} exact={true} />
          <PrivateRoute path="/updateTask/:id" component={UpdateTaskPage} exact={true} />
          <PrivateRoute path="/offlineQueue" component={OfflineQueuePage} exact={true} />
          <PrivateRoute path="/tasks" component={TaskPage} exact={true} />
          <PrivateRoute path="/profile" component={ProfilePage} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/tasks" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
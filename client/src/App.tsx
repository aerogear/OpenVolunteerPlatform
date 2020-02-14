import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Task from './pages/Tasks';
import AddTask from './pages/AddTask';
import UpdateTask from './pages/UpdateTask';
import OfflineQueue from './pages/OfflineQueue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './styles.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/addTask" component={AddTask} exact={true} />
        <Route path="/updateTask/:id" component={UpdateTask} exact={true} />
        <Route path="/offlineQueue" component={OfflineQueue} exact={true} />
        <Route path="/tasks" component={Task} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/tasks" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

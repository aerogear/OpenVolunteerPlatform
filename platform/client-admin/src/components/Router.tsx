import React from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router"
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/react';
import { ActionPage, ProfilePage } from '../pages';
import { ViewActionPage } from '../pages/ViewActionPage';
import { ViewVolunteerPage } from '../pages/ViewVolunteerPage';

import { Menu } from './Menu';
import { SchedulePage } from '../pages/SchedulePage';
import { ActionsMapPage } from '../pages/ActionsMapPage';
import { DistributionCentrePage } from '../pages/DistributionCentrePage';
import { RecipientsPage } from '../pages/RecipientsPage';
import { VolunteersPage } from '../pages/VolunteersPage';
import { ViewRecipientPage } from '../pages/ViewRecipientPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ViewProductPage } from '../pages/ViewProductPage';
import { CreateProductPage } from '../pages/CreateProductPage';
import { CreateRecipientPage } from '../pages/CreateRecipientPage';
import { CreateVolunteerPage } from '../pages/CreateVolunteerPage';
import { CreateVolunteerActionPage } from '../pages/CreateVolunteerAction';
import { ViewDistributionCentrePage } from '../pages/ViewDistributionCentrePage';
import { CreateDistributionCentrePage } from '../pages/CreateDistributionCentrePage';
import { ActionReportPage } from '../pages/ActionReportPage';

export const Router: React.FC = () => {
  return (
    <IonApp className={'dark-theme'}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Switch>
              <Route path="/viewAction/:id" component={ViewActionPage} exact />
              <Route path="/createAction" component={CreateVolunteerActionPage} exact />
              <Route path="/actions" component={ActionPage} exact />
              <Route path="/map" component={ActionsMapPage} exact />
              <Route path="/schedule" component={SchedulePage} exact />
              <Route path="/reports" component={ActionReportPage} exact />
              <Route path="/products" component={ProductsPage} />
              <Route path="/manageProduct/:id" component={ViewProductPage} exact />
              <Route path="/createProduct" component={CreateProductPage} exact />
              <Route path="/volunteers" component={VolunteersPage} />
              <Route path="/manageVolunteer/:id" component={ViewVolunteerPage} exact />
              <Route path="/createVolunteer" component={CreateVolunteerPage} exact />
              <Route path="/recipients" component={RecipientsPage} exact />
              <Route path="/manageRecipient/:id" component={ViewRecipientPage} exact />
              <Route path="/createRecipient" component={CreateRecipientPage} exact />
              <Route path="/distributionCentre" component={DistributionCentrePage} exact />
              <Route path="/manageDistributionCentre/:id" component={ViewDistributionCentrePage} exact />
              <Route path="/createDistributionCentre" component={CreateDistributionCentrePage} exact />
              <Route path="/profile" component={ProfilePage} exact />
              <Redirect to={{ pathname: "actions" }} />
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}
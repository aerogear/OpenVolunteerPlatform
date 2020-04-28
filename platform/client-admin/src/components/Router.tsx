import React, { useContext } from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { IonApp, IonSplitPane, IonRouterOutlet } from '@ionic/react';
import { ActionPage, ProfilePage } from '../pages';
import { ViewActionPage } from '../pages/ViewActionPage';
import { AuthContext } from '../context/AuthContext';
import { useFindActiveVolunteerLazyQuery, VolunteerFieldsFragment } from '../dataFacade';
import { Loading } from './Loading';
import { volunteerTransformer } from '../transformer/volunteerTransformer';
import { IonReactRouter } from '@ionic/react-router';
import { Menu } from './Menu';

export const Router: React.FC = () => {
  const { profile, keycloak } = useContext(AuthContext);

  let [findVolunteerQuery, { data, loading, error, called }] = useFindActiveVolunteerLazyQuery({
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <Loading loading={true} />;
  }

  if (error) {
    console.log(`Error when fetching user ${error}`)
    return (<>`Error`</>)
  }

  if (profile?.username && !called) {
    findVolunteerQuery({ variables: { username: profile?.username } });
  }

  let volunteer: VolunteerFieldsFragment | undefined;
  if (data?.findVolunteers?.length === 1 && data?.findVolunteers[0]) {
    volunteer = volunteerTransformer(data.findVolunteers[0]);
  }

  return (
    <IonApp className={'dark-theme'}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <AuthContext.Provider value={{ profile, keycloak, volunteer }}>
            <Menu />
            <IonRouterOutlet id="main">
              <Switch>
                <Route path="/viewAction/:id" component={ViewActionPage} exact />
                <Route path="/actions" component={ActionPage} exact />
                <Route path="/profile" component={ProfilePage} exact />
                <Route exact path="/" render={() => volunteer ?
                  <Redirect to={{ pathname: "actions" }} /> :
                  <Redirect to="profile" />} />
              </Switch>
            </IonRouterOutlet>
          </AuthContext.Provider>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}
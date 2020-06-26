import React, { useContext } from 'react';
import {
  HashRouter as AppRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { IonApp } from '@ionic/react';
import { ActionPage, ProfilePage } from '../pages';
import { ViewActionPage } from '../pages/ViewActionPage';
import { AuthContext, AuthContextProvider } from '../context/AuthContext';
import { useFindActiveVolunteerLazyQuery, VolunteerFieldsFragment } from '../dataFacade';
import { Loading } from './Loading';
import { volunteerTransformer } from '../transformer/volunteerTransformer';

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
  

  if (data?.findVolunteers?.items.length === 1 && data?.findVolunteers.items[0]) {
    volunteer = volunteerTransformer(data.findVolunteers.items[0]);
  }

  return (
    <IonApp>
      <AppRouter>
        <AuthContextProvider value={{ profile, keycloak, volunteer }}>
          <Switch>
            <Route path="/viewAction/:id" component={ViewActionPage} exact />
            <Route path="/actions" component={ActionPage} exact />
            <Route path="/profile" component={ProfilePage} exact />
            <Route exact path="/" render={() => volunteer ?
              <Redirect to={{ pathname: "actions" }} /> :
              <Redirect to="profile" />} />
          </Switch>
        </AuthContextProvider>
      </AppRouter>
    </IonApp>
  );
}
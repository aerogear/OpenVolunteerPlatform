import React, { useContext } from 'react';
import {
  HashRouter as AppRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { IonApp } from '@ionic/react';
import { TaskPage, ProfilePage } from '../pages';
import { ViewTaskPage } from '../pages/ViewTaskPage';
import { AuthContext } from '../context/AuthContext';
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
  if (data?.findVolunteers?.length === 1 && data?.findVolunteers[0]) {
    volunteer = volunteerTransformer(data.findVolunteers[0]);
  }

  return (
    <IonApp>
      <AppRouter>
        <AuthContext.Provider value={{ profile, keycloak, volunteer }}>
          <Switch>
            <Route path="/viewTask/:id" component={ViewTaskPage} exact />
            <Route path="/tasks" component={TaskPage} exact />
            <Route path="/profile" component={ProfilePage} exact />
            <Route exact path="/" render={() => volunteer ?
              <Redirect to={{ pathname: "tasks" }} /> :
              <Redirect to="profile" />} />
          </Switch>
        </AuthContext.Provider>
      </AppRouter>
    </IonApp>
  );
}
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
import { AuthContext } from '../AuthContext';
import { useFindActiveVolunteerLazyQuery, VolunteerFieldsFragment } from '../dataFacade';
import { Loading } from './Loading';

export const Router: React.FC = () => {
  const { profile } = useContext(AuthContext);

  let [findVolunteerQuery, { data, loading, error }] = useFindActiveVolunteerLazyQuery({
    fetchPolicy: "cache-first"
  });

  if (profile?.username) {
    findVolunteerQuery({ variables: { username: profile?.username } });
  }


  if (loading) {
    return <Loading loading={true} />;

  }
  if (error) {
    console.log(`Error when fetching user ${error}`)
  }

  let user: VolunteerFieldsFragment;

  if (data?.findVolunteers?.length === 1 && data.findVolunteers[0]) {
    user = data.findVolunteers[0];
  }

  return (
    <IonApp>
      <AppRouter>
        <Switch>
          <Route path="/viewTask/:id" component={ViewTaskPage} exact />
          <Route path="/tasks" component={TaskPage} exact />
          <Route path="/profile" component={ProfilePage} exact />
          <Route exact path="/" render={() => user ?
            <Redirect to={{ pathname: "/tasks", state: { user } }} /> :
            <Redirect to="profile" />} />
        </Switch>
      </AppRouter>
    </IonApp>
  );
}
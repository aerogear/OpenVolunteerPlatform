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

  let user: VolunteerFieldsFragment | undefined;
  if (data?.findVolunteers?.length === 1 && data?.findVolunteers[0]) {
    user = data.findVolunteers[0];
  }

  return (
    <IonApp>
      <AppRouter>
        <Switch>
          <Route path="/viewTask/:id" component={ViewTaskPage} exact />
          <Route path="/tasks" state={user} component={TaskPage} exact />
          <Route path="/profile" render={(props) => <ProfilePage {...props} user={user}/>} exact />
          <Route exact path="/" render={() => user ?
            <Redirect to={{ pathname: "tasks", state: { user } }} /> :
            <Redirect to="profile" />} />
        </Switch>
      </AppRouter>
    </IonApp>
  );
}
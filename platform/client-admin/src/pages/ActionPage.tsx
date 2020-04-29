import React, { useContext } from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, ActionsList, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindMyVolunteerActionsLazyQuery, ActionStatus, useFindVolunteerActionLazyQuery, useFindVolunteerActionsLazyQuery } from '../dataFacade';
import { useNetworkStatus } from 'react-offix-hooks';
import { AuthContext } from '../context/AuthContext';

export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  let [findActions, { data, loading, error, called }] = useFindVolunteerActionsLazyQuery({ fetchPolicy: "network-only" })
  const isOnline = useNetworkStatus();

  if (!called) {
    findActions({ variables: { fields: { status: ActionStatus.Assigned } } })
  }
  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findVolunteerActions?.length !== 0) {
    content = <ActionsList tasks={data?.findVolunteerActions} />
  } else {
    content = <Empty message={<p>No tasks!</p>} />;
  }


  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} isOnline={isOnline} />

      <IonContent className="ion-padding" >
        {content}
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );

};

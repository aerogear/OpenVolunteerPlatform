import React, { useContext } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, TaskList, NetworkBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindActiveVolunteerLazyQuery, useFindMyVolounteerActionsLazyQuery, useFindMyVolounteerActionsQuery, VolunteerFieldsFragment } from '../dataFacade';
import { useNetworkStatus } from 'react-offix-hooks';
import { AuthContext } from '../AuthContext';

export const TaskPage: React.FC<RouteComponentProps & { user?: VolunteerFieldsFragment }> = ({ match, history, user }) => {
  let [findActions, { data, loading, error }] = useFindMyVolounteerActionsLazyQuery({ fetchPolicy: "cache-and-network" })
  const isOnline = useNetworkStatus();

  if (user) {
    findActions({ variables: { volounteerId: user.id } })
  }


  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;


  let content;
  if (data?.findVolounteerActions?.length !== 0) {
    content = <TaskList tasks={data?.findVolounteerActions} />
  } else {
    content = <Empty message={<p>No tasks assigned!</p>} />;
  }

  return (
    <IonPage>
      <Header title="CrisisCommunity Volounteer" match={match} isOnline={isOnline} />
      <IonContent className="ion-padding" >
        <IonSegment>
          <IonSegmentButton value="Open">
            <IonLabel>Open Tasks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="closed">
            <IonLabel>Finished Tasks</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {content}
      </IonContent>
      <IonFooter>
        <div>
          AtCrisisCommunity
          <NetworkBadge isOnline={isOnline} />
        </div>
      </IonFooter>
    </IonPage>
  );

};

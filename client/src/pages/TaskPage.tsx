import React from 'react';
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
import { useFindMyVolounteerActionsLazyQuery, VolunteerFieldsFragment, ActionStatus } from '../dataFacade';
import { useNetworkStatus } from 'react-offix-hooks';

interface UserState {
  location: {
    state: { user: VolunteerFieldsFragment }
  }
}

export const TaskPage: React.FC<RouteComponentProps & UserState> = ({ match, location: { state } }) => {

  let [findActions, { data, loading, error, called, refetch }] = useFindMyVolounteerActionsLazyQuery({ fetchPolicy: "network-only" })
  const isOnline = useNetworkStatus();

  if (state && state.user && !called) {
    findActions({ variables: { volounteerId: state.user.id, status: ActionStatus.Assigned } })
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
    content = <Empty message={<p>No tasks!</p>} />;
  }

  const updateFilter = (e: CustomEvent) => {
    refetch({ volounteerId: state.user.id, status: e.detail.value })
  }

  return (
    <IonPage>
      <Header title="CrisisCommunity Volounteer" match={match} isOnline={isOnline} />
      <IonContent className="ion-padding" >
        <IonSegment onIonChange={updateFilter}>
          <IonSegmentButton value={ActionStatus.Assigned}>
            <IonLabel>Open Tasks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={ActionStatus.Completed}>
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

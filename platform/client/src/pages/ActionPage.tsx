import React, { useContext } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter,
  IonLoading,
  IonContent,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { Empty, ActionsList, NetworkBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindMyVolunteerActionsLazyQuery, ActionStatus } from '../dataFacade';
import { useNetworkStatus } from 'react-offix-hooks';
import { AuthContext } from '../context/AuthContext';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';


export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { volunteer } = useContext(AuthContext);
  let [findActions, { data, loading, error, called, refetch }] = useFindMyVolunteerActionsLazyQuery({ fetchPolicy: "network-only" })
  const isOnline = useNetworkStatus();

  if (volunteer && !called) {
    findActions({ variables: { volunteerId: volunteer.id, status: ActionStatus.Assigned } })
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

  const updateFilter = (e: CustomEvent) => {
    if (volunteer) {
      refetch({ volunteerId: volunteer.id, status: e.detail.value })
    }
  }


  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} isOnline={isOnline} />
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
          OpenVolunteer Platform
          <NetworkBadge isOnline={isOnline} />
        </div>
      </IonFooter>
    </IonPage >
  );

};

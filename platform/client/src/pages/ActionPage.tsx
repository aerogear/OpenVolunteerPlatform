import React, { useContext } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter,
  IonLoading,
  IonContent
} from '@ionic/react';
import { Empty, ActionsList, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindMyVolunteerActionsLazyQuery, ActionStatus } from '../dataFacade';
import { AuthContext } from '../context/AuthContext';

export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { volunteer } = useContext(AuthContext);
  let [findActions, { data, loading, error, called, refetch }] = useFindMyVolunteerActionsLazyQuery({ fetchPolicy: "network-only" })

  if (volunteer && !called) {
    findActions({ variables: { volunteerId: volunteer._id, status: ActionStatus.Assigned } })
  }
  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findVolunteerActions?.items.length !== 0) {
    content = <ActionsList actions={data?.findVolunteerActions.items} />
  } else {
    content = <Empty message={<p>No actions assigned to you! You will be notified about new actions soon</p>} />;
  }

  const updateFilter = (e: CustomEvent) => {
    if (volunteer && refetch) {
      refetch({ volunteerId: volunteer._id, status: e.detail.value })
    }
  }


  return (
    <IonPage>
      <Header title="OpenVolunteer Mobile" match={match} />
      <IonContent className="ion-padding" >
        <IonSegment onIonChange={updateFilter}>
          <IonSegmentButton value={ActionStatus.Assigned}>
            <IonLabel>Open Actions</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={ActionStatus.Completed}>
            <IonLabel>Finished Actions</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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

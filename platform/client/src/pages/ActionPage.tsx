import React, { useContext, useEffect } from 'react';
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
import { ActionStatus } from '../dataFacade';
import { AuthContext } from '../context/AuthContext';
import { useFindVolunteerActions } from '../datastore/hooks';


export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { volunteer } = useContext(AuthContext);
  const { isLoading: loading, error, data, subscribeToMore } = useFindVolunteerActions();

  useEffect(() => {
    const subscription = subscribeToMore();
    return () => subscription.unsubscribe();
  }, [data, subscribeToMore]);

  if (error) {
    console.log(error);
  }
  console.log(data);

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data && data.length !== 0) {
    content = <ActionsList actions={data} />
  } else {
    content = <Empty message={<p>No actions assigned to you! You will be notified about new actions soon</p>} />;
  }

  const updateFilter = (e: CustomEvent) => {
    // if (volunteer && refetch) {
    //   refetch({ volunteerId: volunteer._id, status: e.detail.value })
    // }
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

import React, { useContext, useEffect } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter,
  IonLoading,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton
} from '@ionic/react';
import { wifiOutline } from 'ionicons/icons';
import { Empty, ActionsList, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { ActionStatus } from '../dataFacade';
import { useFindVolunteerActions, useCreateVolunteerEntry } from '../datastore/hooks';
import { AuthContext } from '../context/AuthContext';
import { useNetworkStatus } from '../hooks/useNetworkStatus';


export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { volunteer } = useContext(AuthContext);
  const { loading, error, data, subscribeToUpdates } = useFindVolunteerActions();
  const { save: createEntry } = useCreateVolunteerEntry();
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const subscription = subscribeToUpdates();
    return () => subscription.unsubscribe();
  }, [data, subscribeToUpdates]);

  if (error) {
    console.log(error);
  }

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

  const handleEntry = () => {
    createEntry({
      volunteerActions: [],
      checkedInAt: new Date(),
      volunteer: {
        _id: volunteer?._id,
        firstName: volunteer?.firstName,
        lastName: volunteer?.lastName,
        email: volunteer?.email,
        username: volunteer?.username
      },
      distributionCentre: {
        _id: "5ef740ac12f76aecc84af1f2",
        name: "Berlin City Hall"
      }
    }).then(() => {
      // TODO dialog
    }).catch((err) => {
      console.error(err);
    });
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
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ 'marginBottom': '2em', 'marginRight': '1em' }}>
          <IonFabButton onClick={handleEntry}>
            <IonIcon icon={wifiOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
        <IonButton 
          fill="outline" 
          color={ isOnline ? 'primary' : 'danger' }
          style={{ margin: "0 0 0.5em 0.5em" }}
        >
          { isOnline ? 'Online' : 'Offline' }
        </IonButton>
      </IonFooter>
    </IonPage >
  );

};

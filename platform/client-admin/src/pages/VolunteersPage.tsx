import React, { useContext } from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, NetworkBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindVolunteersQuery } from '../dataFacade';
import { useNetworkStatus } from 'react-offix-hooks';
import { VolunteersList } from '../components/model/VolunteerList';

export const VolunteersPage: React.FC<RouteComponentProps> = ({ match }) => {
  let { data, loading, error } = useFindVolunteersQuery({ variables: { limit: 50, fields: {} } })
  const isOnline = useNetworkStatus();

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findVolunteers?.length !== 0) {
    content = <VolunteersList volunteers={data?.findVolunteers as any} />
  } else {
    content = <Empty message={<p>No data!</p>} />;
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
          <NetworkBadge isOnline={isOnline} />
        </div>
      </IonFooter>
    </IonPage >
  );

};

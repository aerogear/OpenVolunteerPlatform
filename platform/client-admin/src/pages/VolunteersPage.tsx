import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindAllVolunteersQuery } from '../dataFacade';
import { VolunteersList } from '../components/model/VolunteerList';

export const VolunteersPage: React.FC<RouteComponentProps> = ({ match }) => {
  let { data, loading, error } = useFindAllVolunteersQuery()
  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findAllVolunteers?.length !== 0) {
    content = <VolunteersList volunteers={data?.findAllVolunteers as any} />
  } else {
    content = <Empty message={<p>No data!</p>} />;
  }

  return (
    <IonPage>
      <Header title="Volunteer List" match={match} />

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

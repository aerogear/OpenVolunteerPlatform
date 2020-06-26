import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { Empty, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindVolunteersQuery } from '../dataFacade';
import { VolunteersList } from '../components/model/VolunteerList';
import { add } from "ionicons/icons";

export const VolunteersPage: React.FC<RouteComponentProps> = ({ match }) => {
  let { data, loading, error } = useFindVolunteersQuery()
  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findVolunteers?.items.length !== 0) {
    content = <VolunteersList volunteers={data?.findVolunteers.items as any} />
  } else {
    content = <Empty message={<p>No data!</p>} />;
  }

  return (
    <IonPage>
      <Header title="Volunteer List" match={match} />

      <IonContent className="ion-padding" >
        {content}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="createVolunteer">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );

};

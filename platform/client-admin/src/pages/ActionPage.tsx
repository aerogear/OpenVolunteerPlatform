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
import { Empty, ActionsList, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindVolunteerActionsQuery } from '../dataFacade';
import { add } from 'ionicons/icons';

export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { data, loading, error } = useFindVolunteerActionsQuery();

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findVolunteerActions?.items.length !== 0) {
    content = <ActionsList actions={data?.findVolunteerActions?.items} />
  } else {
    content = <Empty message={<p>No tasks!</p>} />;
  }


  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} />

      <IonContent className="ion-padding" >
        {content}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="createAction">
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

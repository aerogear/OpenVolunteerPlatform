import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, ActionsList, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindAllVolunteerActionsLazyQuery } from '../dataFacade';

export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  let [findActions, { data, loading, error, called }] = useFindAllVolunteerActionsLazyQuery()

  if (!called) {
    findActions({ variables: { limit: 30 } })
  }
  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findAllVolunteerActions?.length !== 0) {
    content = <ActionsList actions={data?.findAllVolunteerActions} />
  } else {
    content = <Empty message={<p>No tasks!</p>} />;
  }


  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} />

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

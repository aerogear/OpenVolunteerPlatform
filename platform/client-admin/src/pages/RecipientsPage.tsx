import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindAllRecipientsQuery } from '../dataFacade';
import { RecipientList } from '../components/model/RecipientList';


export const RecipientsPage: React.FC<RouteComponentProps> = ({ match }) => {
  let { data, loading, error } = useFindAllRecipientsQuery();

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  let content;
  if (data?.findAllRecipients?.length !== 0) {
    content = <RecipientList recipients={data?.findAllRecipients as any} />
  } else {
    content = <Empty message={<p>No data!</p>} />;
  }


  return (
    <IonPage>
      <Header title="List of Recipients" match={match} />

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

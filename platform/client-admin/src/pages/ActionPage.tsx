import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { Empty, ActionsList, Header } from '../components';
import { RouteComponentProps, useHistory } from 'react-router';
import { useFindVolunteerActionsQuery, useOnNewVolunteerEntrySubscription } from '../dataFacade';
import { add, filter } from 'ionicons/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const ActionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const { data, loading, error } = useFindVolunteerActionsQuery();
  const subscription = useOnNewVolunteerEntrySubscription();
  const history = useHistory();

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
    content = <Empty message={<p>No actions!</p>} />;
  }

  if (subscription.data) {
    const volunteerEntry = subscription.data.newVolunteerEntry;
    toast(`A volunteer "${volunteerEntry.volunteer?.firstName} ${volunteerEntry.volunteer?.lastName}"
    has checked in the distribution centre "${volunteerEntry.distributionCentre?.name}" 
    at ${volunteerEntry.checkedInAt}`, {
      closeButton: true,
      pauseOnHover: true,
      autoClose: 10000,
      position: toast.POSITION.TOP_CENTER,
      onClick: () => history.push(`/volunteerEntry/${volunteerEntry._id}`)
    })
  }

  return (
    <IonPage>
      <ToastContainer />
      <Header title="OpenVolunteer Admin App" match={match} />

      <IonContent className="ion-padding" >
        <IonFab vertical="top" horizontal="end" slot="fixed">
          {/* TODO add handling */}
          <IonFabButton>
            <IonIcon icon={filter} />
          </IonFabButton>
        </IonFab>
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

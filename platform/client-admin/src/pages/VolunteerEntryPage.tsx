import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent
} from '@ionic/react';
import { Header } from '../components';
import { RouteComponentProps, useHistory } from 'react-router';
import { useGetVolunteerEntryQuery, useUpdatedVolunteerEntrySubscription, VolunteerEntry } from '../dataFacade';
import { IUpdateMatchParams } from '../declarations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import volunteerEntrySchema from '../forms/volunteerEntry';
import { AutoForm } from 'uniforms-ionic';

export const VolunteerEntryPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const { data, loading, error } = useGetVolunteerEntryQuery({ variables: { id } });
  const subscription = useUpdatedVolunteerEntrySubscription({ variables: { filter: { _id: { eq: id } } } });

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const volunteerEntry = data?.getVolunteerEntry!;

  if (subscription.data) {
    const { checkedOutAt, volunteerActions } = subscription.data.updatedVolunteerEntry;
    if (volunteerActions) {
      volunteerEntry.volunteerActions = volunteerActions;
    }
    if (checkedOutAt) {
      volunteerEntry.checkedOutAt = checkedOutAt;
      toast(`A volunteer "${volunteerEntry.volunteer?.firstName} ${volunteerEntry.volunteer?.lastName}"
      has checked out the distribution centre "${volunteerEntry.distributionCentre?.name}" 
      at ${checkedOutAt}`, {
        closeButton: true,
        pauseOnHover: true,
        autoClose: 10000,
        position: toast.POSITION.TOP_CENTER,
        onClick: () => history.push(`/actions`)
      })
    }
  }

  const content = getForm(volunteerEntry);
  return (
    <IonPage>
      <ToastContainer />
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

function getForm(volunteerEntry: VolunteerEntry) {
  const model = {
    checkedInAt: new Date(volunteerEntry.checkedInAt!),
    actionsCount: volunteerEntry.volunteerActions?.length || 0,
    volunteer: `${volunteerEntry.volunteer?.firstName} ${volunteerEntry.volunteer?.lastName}`,
    checkedOutAt: volunteerEntry.checkedOutAt ? new Date(volunteerEntry.checkedOutAt) : null,
    distributionCentre: volunteerEntry.distributionCentre?.name
  };

  return <AutoForm
    placeholder
    model={model}
    schema={volunteerEntrySchema}
    showInlineError
    submitField={undefined}
  >
  </AutoForm>
}

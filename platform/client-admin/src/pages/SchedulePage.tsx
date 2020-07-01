import React, { useState } from 'react';
import { useFindDailyActionPlansQuery, useAssignVolunteersMutation } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonItemDivider, IonCard, IonButton } from '@ionic/react';
import { Header } from '../components';
import dailyActionForm from '../forms/dailyAction'
import { RouteComponentProps } from 'react-router-dom';
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic';

export const SchedulePage: React.FC<RouteComponentProps> = ({ match }) => {
  const { data, loading, error } = useFindDailyActionPlansQuery();
  const [dailyPlan, setDailyPlan] = useState({})
  const [assignVolunteer] = useAssignVolunteersMutation();
  if (error) {
    console.log(error);
  }
  
  let content = (<h4>No scheduler run today</h4>)
  const submit = () => {
    assignVolunteer().then((result) => {
      setDailyPlan({...result.data?.assignVolunteers});
    }).catch((error) => {
      console.log("Failure", error);
    })
  }
  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  if (!Object.keys(dailyPlan).length && data?.findDailyActionPlans && data?.findDailyActionPlans.items && data?.findDailyActionPlans.items.length !== 0) {
    const items = data?.findDailyActionPlans.items
    setDailyPlan({...items[items.length - 1]});
  }
  
  if (Object.keys(dailyPlan)) {
    content = (
      <AutoForm
        placeholder
        model={{...dailyPlan}}
        schema={dailyActionForm}
        showInlineError
      >
        <AutoFields />
        <ErrorsField />
  
  
      </AutoForm>
    )
  }

  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} />

      <IonContent className="ion-padding" >
        <IonItemDivider color="light">
          <h2>Last scheduled daily assignments</h2>
        </IonItemDivider>
        <IonCard>
          {content}
        </IonCard>
        <IonButton onClick={() => submit()}>Schedule daily assignments</IonButton>

      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );
};

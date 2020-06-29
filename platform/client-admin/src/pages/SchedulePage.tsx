import React from 'react';
import { useCreateDailyActionPlanMutation, useFindDailyActionPlansQuery, ActionStatus } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonItemDivider, IonCard, IonButton } from '@ionic/react';
import { Header } from '../components';
import dailyActionForm from '../forms/dailyAction'
import { RouteComponentProps } from 'react-router-dom';
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic';

export const SchedulePage: React.FC<RouteComponentProps> = ({ match }) => {
  const { data, loading, error } = useFindDailyActionPlansQuery();

  const [createDailyAction] = useCreateDailyActionPlanMutation();
  if (error) {
    console.log(error);
  }

  const submit = () => {
    createDailyAction({
      variables: {
        input: {
          date: new Date,
          owner: "admin",
          numberOfCasesCreated: 10 + new Date().getTime() % 6,
          numberOfVolunteersAssigned: 10 + new Date().getTime() % 6
        }
      }
    }).then((result) => {
      console.log("success");
      window.location.reload(false);
    }).catch((error) => {
      console.log("Failure", error);
    })
  }
  let content = (<h4>No scheduler run today</h4>)
  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  let dailyAction: any = {};
  if (data?.findDailyActionPlans && data?.findDailyActionPlans.items && data?.findDailyActionPlans.items.length !== 0) {
    dailyAction = data?.findDailyActionPlans.items.pop();
    content = (
      <AutoForm
        placeholder
        model={{ ...dailyAction }}
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

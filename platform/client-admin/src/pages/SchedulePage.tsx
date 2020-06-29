import React from 'react';
import { useCreateDailyActionPlanMutation, useFindDailyActionPlansQuery, ActionStatus } from '../dataFacade';
import { IonLoading, IonPage, IonContent, IonFooter, IonItemDivider, IonCard } from '@ionic/react';
import { Header } from '../components';
import dailyActionForm from '../forms/recipient'
import { RouteComponentProps } from 'react-router-dom';
import { AutoForm } from 'uniforms';

export const SchedulePage: React.FC<RouteComponentProps> = ({ match }) => {
  const { data, loading, error } = useFindDailyActionPlansQuery();

  const [createDailyAction] = useCreateDailyActionPlanMutation();
  if (error) {
    console.log(error);
  }

  const submit = (model: any) => {
    createDailyAction({ variables: { input: { date: new Date, owner: "admin", numberOfCasesCreated: 12, numberOfVolunteersAssigned: 31 } } }).then((result) => {
      console.log("success");
      window.location.reload(false);
    }).catch((error) => {
      console.log("Failure", error);
    })
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  let dailyAction: any = {};
  if (data?.findDailyActionPlans && data?.findDailyActionPlans.items && data?.findDailyActionPlans.items.length !== 0) {
    dailyAction = data?.findDailyActionPlans.items.pop();
  }

  console.log("test ", dailyAction)
  return (
    <IonPage>
      <Header title="OpenVolunteer Admin App" match={match} />

      <IonContent className="ion-padding" >
        <IonItemDivider color="light">
          <h2>Last scheduled daily assignments</h2>
        </IonItemDivider>
        <IonCard>
          <AutoForm
            placeholder
            // model={{ ...dailyAction }}
            schema={dailyActionForm}
            onSubmit={(model: any) => submit(model)}
            showInlineError
          ></AutoForm>
        </IonCard>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );
};

import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Header } from '../components/Header';
import { Map } from '../components/Map';
import { IUpdateMatchParams } from '../declarations';
import { useFindVolunteerActionQuery } from '../dataFacade'
import { AutoForm, SelectField } from 'uniforms-ionic'
import volunteerAction from '../forms/volunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';

export const ViewTaskPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useFindVolunteerActionQuery({ fetchPolicy: "cache-first", variables: { id: match.params.id } });

  if (error) {
    console.log(error);
  }

  if (!data || !data.findVolunteerActions[0]) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  const model = data.findVolunteerActions[0];
  console.log(model)

  return (
    <>
      <Header title="Manage your action" backHref="/tasks" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Action information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={volunteerAction}
                onSubmit={(model: any) => { }}
                showInlineError
                submitField={undefined}
              >
                {/* <SelectField name="status" value={model.status} /> */}

              </AutoForm>
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>

      {/* <Map></Map> */}
    </>
  );

}

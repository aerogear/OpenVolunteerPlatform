import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useCreateVolunteerMutation } from '../dataFacade'
import { AutoForm } from 'uniforms-ionic'
import volunteerFormSchema from '../forms/createVolunteer';
import { IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router';

export const CreateVolunteerPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const model = {};
  const history = useHistory()
  const [createVolunteer] = useCreateVolunteerMutation();

  return (
    <>
      <Header title="Create Volunteer" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volunteer information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={volunteerFormSchema}
                onSubmit={(model: any) => {
                  createVolunteer({
                    variables: {
                      input: {
                        id: model.id,
                        city: model.city,
                        email: model.email,
                        username: model.username,
                        lastName: model.lastName,
                        firstName: model.firstName,
                        address1: model.address1,
                        address2: model.address2,
                        dateOfBirth: model.dateOfBirth,
                        canDeliver: model.canDeliver
                      }
                    }
                  }).then(({data}) => {
                    history.push(`/manageVolunteer/${data?.createVolunteer.id}`);
                  }).catch(console.error);
                }}
                showInlineError
                submitField={undefined}
              >
              </AutoForm>
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>


    </>
  );

}

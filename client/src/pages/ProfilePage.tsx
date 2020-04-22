import React, { useContext } from 'react';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItemGroup,
  IonItemDivider,
  IonList,
} from '@ionic/react';
import { Header } from '../components';
import { AuthContext } from '../context/AuthContext';
import { RouteComponentProps, useHistory } from 'react-router';
import { useCreateVolunteerMutation, useUpdateVolunteerMutation } from "../dataFacade"

import volunteerForm from '../forms/volunteer';

import { AutoForm } from 'uniforms-ionic'
import { volunteerTransformer } from '../transformer/volunteerTransformer';

export const ProfilePage: React.FC<RouteComponentProps> = ({ match }) => {
  const { keycloak, profile, volunteer } = useContext(AuthContext);
  const [createVolunteerMutation] = useCreateVolunteerMutation()
  const [updateVolunteerMutation] = useUpdateVolunteerMutation()
  const history = useHistory()

  if (!keycloak || !profile) return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Authentication not configured</IonCardTitle>
        <IonCardSubtitle>IDM service required</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        Profile page cannot be displayed.
        Please enable Auth SDK by providing configuration pointing to your IDM service
      </IonCardContent>
    </IonCard>
  );

  const submit = (model: any) => {

    if (volunteer) {
      updateVolunteerMutation({
        variables: { input: model }
      }).then(() => {
        history.push("/tasks")
      }).catch((e: any) => {
        console.log(e);
      })
    } else {
      createVolunteerMutation({
        variables: { input: model }
      }).then(() => {
        history.push("/tasks")
      }).catch((e: any) => {
        console.log(e);
      })
    }
  }

  return (
    <>
      <Header title="Profile" backHref="/tasks" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volunteer information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={{ ...volunteer }}
                schema={volunteerForm}
                onSubmit={(model: any) => submit(model)}
                showInlineError
              />
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>
    </>
  );

};

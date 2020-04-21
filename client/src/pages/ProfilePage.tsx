import React, { useContext, useState } from 'react';
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
  IonToast,
} from '@ionic/react';
import { Header } from '../components';
import { AuthContext } from '../AuthContext';
import { RouteComponentProps, useHistory } from 'react-router';
import { useCreateVolunteerMutation, VolunteerFieldsFragment, useUpdateVolunteerMutation } from "../dataFacade"

import volounteerForm from '../forms/volounteer';

import { AutoForm } from 'uniforms-ionic'

export const ProfilePage: React.FC<RouteComponentProps & { user?: VolunteerFieldsFragment }> = ({ match, user }) => {
  const { keycloak, profile } = useContext(AuthContext);
  const [showDialog, setShowDialog] = useState(false)
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
    if (user) {
      updateVolunteerMutation({
        variables: { input: model }
      }).then((e: any) => {
        history.push("/tasks", { user })
      }).catch((e: any) => {
        console.log(e);
      })
    } else {
      createVolunteerMutation({
        variables: { input: model }
      }).then(() => {
        history.push("/tasks", { user })
      }).catch((e: any) => {
        console.log(e);
      })
    }
  }

  if (user) {
    user.dateOfBirth = new Date(user.dateOfBirth);
    delete user.__typename;
  }

  return (
    <>
      <Header title="Profile" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volounteer information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={{ ...user }}
                schema={volounteerForm}
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

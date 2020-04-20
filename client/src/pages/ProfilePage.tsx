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
import { AuthContext } from '../AuthContext';
import { RouteComponentProps } from 'react-router';
import { useCreateVolunteerMutation, VolunteerFieldsFragment } from "../dataFacade"

import volounteerForm from '../forms/volounteer';

import { AutoForm } from 'uniforms-ionic'

export const ProfilePage: React.FC<RouteComponentProps & {user?: VolunteerFieldsFragment}> = ({ history, match, user }) => {
  const { keycloak, profile } = useContext(AuthContext);

  const [createVolunteerMutation] = useCreateVolunteerMutation()

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
    createVolunteerMutation({
      variables: {
        input: {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          email: profile?.email,
          username: profile?.username,
          address1: model.address1,
          address2: model.address2,
          city: model.city,
          dateOfBirth: model.dateOfBirth,
          canPhoneCall: model.canPhoneCall,
          canDeliver: model.canDeliver
        }
      }
    }).then(() => {
      history.push("/tasks")
    }).catch((e) => {
      console.log(e);
    })
  }

  return (
    <>
      <Header title="Profile" backHref="/tasks" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volounteer information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={user}
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

import React, { useContext, SyntheticEvent } from 'react';
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox
} from '@ionic/react';
import { Header } from '../components';
import { AuthContext } from '../AuthContext';
import { RouteComponentProps } from 'react-router';
import { useCreateVolunteerMutation } from "../dataFacade"

import volounteerForm from '../forms/volounteer';

import { AutoForm } from 'uniforms-ionic'

export const ProfilePage: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { keycloak, profile } = useContext(AuthContext);

  const [createVolunteerMutation] = useCreateVolunteerMutation({})


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

  const fullName = (profile.firstName !== 'unknown' && profile.lastName !== 'unknown')
    ? `${profile.firstName} ${profile.lastName}`
    : 'unknown';


  let shouldCreate = true;

  const submit = (model: any) => {
    createVolunteerMutation({
      variables: {
        input: {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          email: profile?.email,
          username: profile?.username,
          address1: "TMP",
          address2: "TMP",
          city: "TMP",
          dateOfBirth: "TMP",
          canPhoneCall: true,
          canDeliver: true,
          ...model
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
      {shouldCreate ?
        <Header title="Create Profile" backHref='/tasks' match={match} /> :
        <Header title="Profile" backHref="/tasks" match={match} />
      }
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemDivider color="light">
              <h2>Volounteer profile</h2>
            </IonItemDivider>
            <IonItem>
              <div className="identity-header">Full Name: {fullName}</div>
              <div id="e2e-profile-full-name" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header">Email: {profile.email}</div>
              <div id="e2e-profile-email" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header"> Username: {profile.username}</div>
              <div id="e2e-profile-username" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <IonLabel>Email Verified: {profile.emailVerified ? 'Yes' : 'No'}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volounteer information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
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

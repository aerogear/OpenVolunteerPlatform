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

export const ProfilePage: React.FC<RouteComponentProps> = ({ match }) => {
  let { keycloak, profile, volunteer, setVolunteer } = useContext(AuthContext);
  const [createVolunteerMutation] = useCreateVolunteerMutation();
  const [updateVolunteerMutation] = useUpdateVolunteerMutation();
  const history = useHistory();
  
  const createVolunteer = volunteer?._id === undefined;

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
    if (createVolunteer) {
      createVolunteerMutation({
        variables: { input: model }
      }).then(({ data }) => {
        setVolunteer({
          ...model, 
          _id: data?.createVolunteer?._id
        });
        history.push("/actions")
      }).catch((e: any) => {
        console.log(e);
      })
    } else {
      const {createdAt, updatedAt, ...rest} = model
      updateVolunteerMutation({
        variables: { input: rest }
      }).then(() => {
        setVolunteer(model);
        history.push("/actions")
      }).catch((e: any) => {
        console.log(e);
      })
    }
  }

  console.log({volunteer});

  if (!volunteer) {
    volunteer = {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      canDeliver: false
    } as any;
    if (navigator && navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition((location) => {
          setVolunteer({
            ...volunteer
          } as any);
        }, console.error);
    }
  }

  return (
    <>
      <Header title="Profile" backHref="/actions" match={match} />
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

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
import { RouteComponentProps } from 'react-router';

import adminForm from '../forms/admin';
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic'

export const ProfilePage: React.FC<RouteComponentProps> = ({ match }) => {
  let { keycloak, profile } = useContext(AuthContext);

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

  return (
    <>
      <Header title="Profile" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Admin user information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={{ ...profile }}
                schema={adminForm}
                showInlineError
              >
                <AutoFields />
                <ErrorsField />
              </AutoForm>
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>
    </>
  );

};

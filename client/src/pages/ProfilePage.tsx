import React, { useEffect, useState, useContext, SyntheticEvent } from 'react';
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
import { AppContext } from '../AppContext';
import { RouteComponentProps } from 'react-router';

const userInit = {
  username: 'unknown',
  email: 'unknown',
  firstName: 'unknown',
  lastName: 'unknown',
  emailVerified: false,
}

export const ProfilePage: React.FC<RouteComponentProps> = ({ history, match }) => {
  const { keycloak } = useContext(AppContext);
  const [user, setUser] = useState<Keycloak.KeycloakProfile>(userInit);

  useEffect(() => {
    const loadProfile = async () => {
      await keycloak?.loadUserProfile();
      setUser({
        ...userInit,
        ...keycloak?.profile
      });
    }
    if (keycloak) loadProfile()
  }, [keycloak]);

  if (!keycloak) return (
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

  const fullName = (user.firstName !== 'unknown' && user.lastName !== 'unknown')
    ? `${user.firstName} ${user.lastName}`
    : 'unknown';

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();

    // updateTaskMutation({
    //   variables
    // })
    //   .then(() => history.push('/'))
    //   .catch(handleError);
  }


  let shouldCreate = true;
  let header;


  return (
    <>
      {shouldCreate ?
        <Header title="Create Profile" backHref='/profile' match={match} /> :
        <Header title="Profile" backHref="/tasks" match={match} />
      }}
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
              <div className="identity-header">Email: {user.email}</div>
              <div id="e2e-profile-email" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header"> Username: {user.username}</div>
              <div id="e2e-profile-username" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <IonLabel>Email Verified: {user.emailVerified ? 'Yes' : 'No'}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volounteer information</h2>
              </IonItemDivider>
              <form onSubmit={submit} style={{ padding: '0 16px' }}>
                <IonItem>
                  <IonLabel color="primary" position="floating">Date of Birth</IonLabel>
                  <IonInput type="date" name="dateOfBirth" />
                </IonItem>
                <IonItem>
                  <IonLabel color="primary" position="floating">Address</IonLabel>
                  <IonInput type="text" name="address1" />
                </IonItem>
                <IonItem>
                  <IonLabel color="primary" position="floating">Address 2 </IonLabel>
                  <IonInput type="text" name="address2" />
                </IonItem>
                <IonItem>
                  <IonLabel color="primary" position="floating">City</IonLabel>
                  <IonInput type="text" name="city" />
                </IonItem>
                <IonItem>
                  <IonLabel color="primary" position="floating">I volounteer to make phone calls to recipients</IonLabel>
                  <IonCheckbox name="canPhoneCall" />
                </IonItem>
                <IonItem>
                  <IonLabel color="primary" position="floating">I volounteer to deliver basic goods to recipients</IonLabel>
                  <IonCheckbox name="canDeliver" />
                </IonItem>

                <IonButton className="submit-btn" expand="block" type="submit">Submit your details</IonButton>
              </form>
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>
    </>
  );

};

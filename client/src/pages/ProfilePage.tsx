import React, { useEffect, useState, useContext } from 'react';
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
  IonLabel
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

export const ProfilePage: React.FC<RouteComponentProps> = ({ match }) => {
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

  const roles = keycloak.realmAccess?.roles.map((role, index) => {
    return <IonItem key={index}>{ role }</IonItem>
  });

  return (
    <>
      <Header title="Profile" backHref="/tasks" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemDivider color="light">
              <h2>Provider</h2>
            </IonItemDivider>
            <IonItem>
              <div className="identity-header">Full Name: { fullName }</div>
              <div id="e2e-profile-full-name" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header">Email: { user.email }</div>
              <div id="e2e-profile-email" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <div className="identity-header"> Username: { user.username }</div>
              <div id="e2e-profile-username" className="identity-text"></div>
            </IonItem>
            <IonItem>
              <IonLabel>Email Verified: { user.emailVerified ? 'Yes' : 'No'}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Assigned Roles</h2>
              </IonItemDivider>
              { roles }
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>
    </>
  );

};

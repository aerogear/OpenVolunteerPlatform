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
import { useKeycloak } from '@react-keycloak/web';
import { AppContext } from '../services/AppContext';

const userInit = {
  username: 'unknown',
  email: 'unknown',
  firstName: 'unknown',
  lastName: 'unknown',
  emailVerified: false,
}

export const ProfilePage: React.FC = () => {
  const { keycloakEnabled } = useContext(AppContext);
  const [keycloak] = useKeycloak();
  const [user, setUser] = useState<Keycloak.KeycloakProfile>(userInit);

  useEffect(() => {
    const load = async () => {
      const user = await keycloak.loadUserProfile();
      setUser({
        ...userInit,
        ...user,
      });
    }
    if(keycloakEnabled) load();
  }, [keycloak, keycloakEnabled]);

  if (!keycloakEnabled) return (
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

  if (user) {

    const fullName = (user.firstName !== 'unknown' && user.lastName !== 'unknown') 
      ? `${user.firstName} ${user.firstName}` 
      : 'unknown';

    const roles = keycloak.realmAccess?.roles.map((role, index) => {
      return <IonItem key={index}>{ role }</IonItem>
    });

    return (
      <>
        <Header title="Profile" backHref="/tasks" />
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
    )
  };

  return (<h1>Something went wrong!</h1>);
};

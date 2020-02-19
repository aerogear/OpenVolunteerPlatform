import React, { useContext, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonToast, IonButton, IonIcon } from '@ionic/react';
import { useKeycloak } from '@react-keycloak/web';
import { person, exit } from 'ionicons/icons';
import { AppContext } from '../AppContext';
import { keycloakHelpers } from '../helpers';
import { useNetworkStatus } from 'react-offix-hooks';

export const Header : React.FC<{ title: string, backHref?: string, match: any }> = ({ title, backHref, match }) => {

  const { url } = match;

  const [ keycloak ] = useKeycloak();
  const isOnline = useNetworkStatus();
  const { keycloakEnabled } = useContext(AppContext);
  const [ showToast, setShowToast ] = useState(false);

  const logout = async () => {
    if (isOnline) {
      await keycloakHelpers.logout({ keycloak });
      return;
    }
    setShowToast(true);
  }

  // if keycloak is not configured, don't display logout and
  // profile icons. Only show login and profile icons on the home
  // screen
  const buttons = (!keycloakEnabled || url !== '/tasks') ? <></> : (
    <IonButtons slot="end">
      <IonButton href="/profile">
        <IonIcon slot="icon-only" icon={person}  />
      </IonButton>
      <IonButton onClick={logout}>
        <IonIcon slot="icon-only" icon={exit} />
      </IonButton>
    </IonButtons>
  );

  return (
    <>
      <IonHeader>
        <IonToolbar>
          {
            url !== '/tasks' &&
            <IonButtons slot="start">
              <IonBackButton defaultHref={ backHref } />
            </IonButtons>
          }
          <IonTitle>{ title }</IonTitle>
          {   buttons }
        </IonToolbar>
      </IonHeader>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="You are currently offline. Unable to logout."
        position="top"
        color="danger"
        duration={1000}
      />
    </>
  );
};

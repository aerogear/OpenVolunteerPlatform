import React, { useContext, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonToast, IonButton, IonIcon } from '@ionic/react';
import { person, exit, arrowBack } from 'ionicons/icons';
import { AppContext } from '../AppContext';
import { logout } from '../auth/keycloakAuth';
import { useNetworkStatus, useApolloOfflineClient } from 'react-offix-hooks';
import { Link } from 'react-router-dom';

export const Header : React.FC<{ title: string, backHref?: string, match: any }> = ({ title, backHref, match }) => {

  const { url } = match;

  const isOnline = useNetworkStatus();
  const client = useApolloOfflineClient();
  const { keycloak } = useContext(AppContext);
  const [ showToast, setShowToast ] = useState(false);

  const handleLogout = async () => {
    if (isOnline) {
      await logout({ keycloak, client });
      return;
    }
    setShowToast(true);
  }

  // if keycloak is not configured, don't display logout and
  // profile icons. Only show login and profile icons on the home
  // screen
  const buttons = (!keycloak || url !== '/tasks') ? <></> : (
    <IonButtons slot="end">
      <Link to="/profile">
        <IonButton>
          <IonIcon slot="icon-only" icon={person}  />
        </IonButton>
      </Link>
      <IonButton onClick={handleLogout}>
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
            <Link 
              to={backHref as string} 
              slot="start"
              role="button"
            >
              <IonButtons>
                <IonButton>
                  <IonIcon icon={arrowBack}/>
                </IonButton>
              </IonButtons>
            </Link>
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

import React, { useContext } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { person, exit } from 'ionicons/icons';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../keycloakAuth';
import { Link } from 'react-router-dom';

export const Header: React.FC<{ title: string, match: any }> = ({ title, match }) => {
  const { url } = match;

  const { keycloak } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout(keycloak );
    return;
  }

  // if keycloak is not configured, don't display logout and
  // profile icons. Only show login and profile icons on the home
  // screen
  const buttons = (!keycloak || url !== '/actions') ? <></> : (
    <IonButtons slot="end">
      <Link to="/profile">
        <IonButton>
          <IonIcon slot="icon-only" icon={person} />
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
          <IonTitle>{title}</IonTitle>
          {buttons}
        </IonToolbar>
      </IonHeader>
    </>
  );
};

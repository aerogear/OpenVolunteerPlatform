import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';

export const Header : React.FC<{ title: string, backHref: string }> = ({ title, backHref }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={ backHref } />
        </IonButtons>
        <IonTitle>{ title }</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

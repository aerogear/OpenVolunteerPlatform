import React from 'react';
import { IonContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';

export const Empty: React.FC<any> = ({ message }) => {
  return (
    <IonContent>
      <IonGrid className="queue-empty ion-justify-content-center">
        <IonRow className="ion-justify-content-center">
          <IonCol>
            <IonText color="medium">
              { message }
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

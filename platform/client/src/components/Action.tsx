import React from 'react';
import {
  IonItem,
  IonButton,
  IonLabel,
  IonNote,
  IonBadge,
  IonIcon,
  IonButtons
} from '@ionic/react';
import { helpBuoy, open } from 'ionicons/icons';
import { Link } from 'react-router-dom';

export const Action: React.FC<any> = ({ action }) => {

  return (
    <IonItem>
      <IonIcon icon={helpBuoy} className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <h2>{action.title}</h2>
        <IonNote item-start>
          {action.description}
        </IonNote>
        <br />
        <IonNote>
          <IonBadge color='primary'>
            {action.status}
          </IonBadge>
        </IonNote>
      </IonLabel>
      <IonButtons>

        <Link to={`viewAction/${action._id}`}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
          </IonButton>
        </Link>

      </IonButtons>
    </IonItem>
  );

};

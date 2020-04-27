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

export const Task: React.FC<any> = ({ task, updateTask, deleteTask }) => {

  return (
    <IonItem>
      <IonIcon icon={helpBuoy} className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <h2>{task.title}</h2>
        <IonNote item-start>
          {task.description}
        </IonNote>
        <br />
        <IonNote>
          <IonBadge color='primary'>
            {task.status}
          </IonBadge>
        </IonNote>
      </IonLabel>
      <IonButtons>

        <Link to={`viewTask/${task.id}`}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
          </IonButton>
        </Link>

      </IonButtons>
    </IonItem>
  );

};

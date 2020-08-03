import React from 'react';
import {
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
  IonButtons,
  IonBadge
} from '@ionic/react';
import { peopleCircleSharp, open, callOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { RecipientFieldsFragment } from '../../dataFacade';

export const Recipient: React.FC<{ recipient: RecipientFieldsFragment }> = ({ recipient }) => {

  return (
    <IonItem>
      <IonIcon icon={peopleCircleSharp} className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <h2>{recipient.firstName} {recipient.lastName}</h2>
        <p>Deliveries
        <IonBadge style={{ margin: "5px" }} color='tertiary'>
          {recipient.deliveryDays}
        </IonBadge>
        </p>
        <p>Actions Completed
        <IonBadge style={{ margin: "5px" }} color='success'>
         {recipient.actionsCompleted}
        </IonBadge>
        </p>
       
        <p> <IonIcon icon={callOutline}></IonIcon>: <a href={`tel://${recipient.phone}`}>{recipient.phone}</a></p>
      </IonLabel>
      <IonButtons>

        <Link to={`manageRecipient/${recipient._id}`}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
          </IonButton>
        </Link>

      </IonButtons>
    </IonItem >
  );

};

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
import { VolunteerFieldsFragment } from '../../dataFacade';

export const Volunteer: React.FC<{ volunteer: VolunteerFieldsFragment }> = ({ volunteer }) => {

  return (
    <IonItem>
      <IonIcon icon={helpBuoy} className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <h2>{volunteer.firstName} {volunteer.lastName}</h2>
        <IonNote item-start>
          {volunteer.canDeliver}
        </IonNote>
        <br />
        <IonNote>
          {volunteer.canDeliver &&
            <IonBadge color='primary'>
              Delivery
            </IonBadge>}
          {volunteer.canPhoneCall &&
            <IonBadge color='primary'>
              Phone call
            </IonBadge>}
        </IonNote>
      </IonLabel>
      <IonButtons>

        <Link to={`manageVolunteer/${volunteer.id}`}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
          </IonButton>
        </Link>

      </IonButtons>
    </IonItem>
  );

};

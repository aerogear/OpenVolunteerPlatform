import React from 'react';
import {
  IonItem,
  IonButton,
  IonLabel,
  IonBadge,
  IonIcon,
  IonButtons
} from '@ionic/react';
import { peopleOutline, open } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { VolunteerFieldsFragment } from '../../dataFacade';

export const Volunteer: React.FC<{ volunteer: VolunteerFieldsFragment }> = ({ volunteer }) => {

  return (
    <IonItem>
      <IonIcon icon={peopleOutline} className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <h2>{volunteer.firstName} {volunteer.lastName}</h2>
        <br />
        {volunteer.canDeliver &&
          <p>
            Action Type
            <IonBadge style={{ margin: "5px" }} color='primary'>
              Delivery
            </IonBadge>
          </p>}
        <p>
          Status
          <IonBadge style={{ margin: "5px" }} color='tertiary'>
            {volunteer.active ? "Active" : "Inactive"}
          </IonBadge>
        </p>

        <p>Actions Completed
        <IonBadge style={{ margin: "5px" }} color='success'>
            {volunteer.actionsCompleted}
          </IonBadge>
        </p>

      </IonLabel>
      <IonButtons>

        <Link to={`manageVolunteer/${volunteer._id}`}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
          </IonButton>
        </Link>

      </IonButtons>
    </IonItem >
  );

};

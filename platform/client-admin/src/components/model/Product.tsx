import React from 'react';
import {
  IonItem,
  IonButton,
  IonLabel,
  IonNote,
  IonIcon,
  IonButtons
} from '@ionic/react';
import { cartSharp, open } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { ProductFieldsFragment } from '../../dataFacade';

export const Product: React.FC<{ product: ProductFieldsFragment }> = ({ product }) => {
  // TODO - link a product to volunteer action. See https://github.com/aerogear/OpenVolunteerPlatform/issues/69

  return (
    <IonItem>
      <IonIcon icon={cartSharp} className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <IonNote item-start>
          {product.label}
        </IonNote>
      </IonLabel>
      <IonButtons>

        <Link to={`manageProduct/${product._id}`}>
          <IonButton item-start color='primary' fill="outline">
            <IonIcon icon={open} />
          </IonButton>
        </Link>
      
      </IonButtons>
    </IonItem >
  );

};

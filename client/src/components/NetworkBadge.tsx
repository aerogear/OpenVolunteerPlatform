import React from 'react';
import { IonBadge } from '@ionic/react';

export const NetworkBadge: React.FC<{ isOnline: boolean}> = ({ isOnline }) => {

  return (isOnline) 
    ?<IonBadge class="network-badge" color="secondary">Online</IonBadge>
    :<IonBadge class="network-badge" color="primary">Offline</IonBadge>;

};
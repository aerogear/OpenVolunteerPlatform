import React from 'react';
import { IonLoading } from '@ionic/react';

// @ts-ignore
export const Loading = ({ loading }) => {
  return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;
};
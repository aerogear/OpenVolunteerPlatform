import React from 'react';
import { IonLoading } from '@ionic/react';
import { ILoadingProps } from '../../declarations';

export const Loading: React.FC<ILoadingProps> = ({ loading }) => {
  return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;
};
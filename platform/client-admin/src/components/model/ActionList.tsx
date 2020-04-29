import React from 'react';
import { Action } from './Action';
import { IonList } from '@ionic/react';
import { Empty } from '../Empty';

export const ActionsList: React.FC<any> = ({ actions }) => {
  if(!actions || actions.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          actions.map((action : any) => {
            return <Action key={action.id} action={action} />;
          })
        }
      </IonList>
    </>
  );

};

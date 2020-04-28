import React from 'react';
import { Action } from './Action';
import { IonList } from '@ionic/react';
import { Empty } from './Empty';

export const ActionsList: React.FC<any> = ({ tasks }) => {
  if(!tasks || tasks.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          tasks.map((task : any) => {
            return <Action key={task.id} task={task} />;
          })
        }
      </IonList>
    </>
  );

};

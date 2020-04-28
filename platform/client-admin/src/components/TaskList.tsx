import React from 'react';
import { Task } from './Task';
import { IonList } from '@ionic/react';
import { Empty } from './Empty';

export const TaskList: React.FC<any> = ({ tasks }) => {
  if(!tasks || tasks.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          tasks.map((task : any) => {
            return <Task key={task.id} task={task} />;
          })
        }
      </IonList>
    </>
  );

};

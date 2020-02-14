import React from 'react';
import { Task } from './Task';
import { IonList, IonContent } from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { DELETE_TASK, UPDATE_TASK } from '../gql/queries';
import { ITask } from '../declarations';
import { Empty } from './Empty';
import { mutationOptions } from '../helpers';

const TaskList: React.FC<any> = ({ tasks }) => {

  const [updateTask] = useOfflineMutation(UPDATE_TASK, mutationOptions.updateTask);
  const [deleteTask] = useOfflineMutation(DELETE_TASK, mutationOptions.deleteTask);
  
  const handleDelete = (task: ITask) => {
    deleteTask({ variables: task });
  };

  const handleUpdate = (task: ITask) => {
    updateTask({variables: task});
  }
  
  if(tasks.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <IonContent className="ion-padding" >
      <IonList>
        {
          tasks.map((task : ITask) => {
            return <Task key={task.id} task={task} updateTask={handleUpdate} deleteTask={handleDelete} />;
          })
        }
      </IonList>
    </IonContent>
  );

};

export default TaskList;

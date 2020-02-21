import React from 'react';
import { Task } from './Task';
import { IonList } from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { ITask } from '../declarations';
import { Empty } from './Empty';
import { mutationOptions } from '../helpers';
import { updateTask } from '../graphql/mutations/updateTask';
import { deleteTask } from '../graphql/mutations/deleteTask';

export const TaskList: React.FC<any> = ({ tasks }) => {

  const [updateTaskMutation] = useOfflineMutation(updateTask, mutationOptions.updateTask);
  const [deleteTaskMutation] = useOfflineMutation(deleteTask, mutationOptions.deleteTask);
  
  const handleDelete = (task: ITask) => {
    deleteTaskMutation({ variables: { input: task } });
  };

  const handleUpdate = (task: ITask) => {
    updateTaskMutation({variables: { input: task }});
  }
  
  if(tasks.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <IonList>
      {
        tasks.map((task : ITask) => {
          return <Task key={task.id} task={task} updateTask={handleUpdate} deleteTask={handleDelete} />;
        })
      }
    </IonList>
  );

};

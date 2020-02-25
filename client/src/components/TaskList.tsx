import React from 'react';
import { Task } from './Task';
import { IonList } from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { ITask } from '../declarations';
import { Empty } from './Empty';
import { mutationOptions } from '../helpers';
import { updateTask } from '../graphql/mutations/updateTask';
import { deleteTask } from '../graphql/mutations/deleteTask';
import { createOptimisticResponse } from '../helpers/optimisticResponse';

export const TaskList: React.FC<any> = ({ tasks }) => {

  const [updateTaskMutation] = useOfflineMutation(updateTask, mutationOptions.updateTask);
  const [deleteTaskMutation] = useOfflineMutation(deleteTask, mutationOptions.deleteTask);
  
  const handleDelete = (task: ITask) => {
    const input = task;
    delete input.__typename;
    deleteTaskMutation({ 
      variables: { input },
      optimisticResponse: createOptimisticResponse({
        ...mutationOptions.deleteTask, 
        mutation: deleteTask,
        variables: { input },
      }), 
    });
  };

  const handleUpdate = (task: ITask) => {
    const input = task;
    delete input.__typename;
    updateTaskMutation({
      variables: { input },
      optimisticResponse: createOptimisticResponse({
        ...mutationOptions.updateTask, 
        mutation: updateTask,
        variables: { input },
      }),
    });
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

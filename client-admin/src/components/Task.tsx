import React, { MouseEvent, SyntheticEvent } from 'react';
import {
  IonItem,
  IonButton,
  IonLabel,
  IonNote,
  IonBadge,
  IonIcon,
  IonCheckbox,
  IonButtons
} from '@ionic/react';
import { create, trash } from 'ionicons/icons';
import { ITask } from '../declarations';
import { Link } from 'react-router-dom';

export const Task: React.FC<any> = ({ task, updateTask, deleteTask }) => {
 
  const onDeleteClick = (event: MouseEvent) => {
    event.preventDefault();
    deleteTask(task);
  };

  const check = (event: SyntheticEvent) => {
    event.preventDefault();
    let status = (task.status === 'COMPLETE') ? 'OPEN' : 'COMPLETE'; 
    updateTask({
      ...task,
      status
    });
  }

  const isChecked = (task: ITask) => {
    if (task.status === 'COMPLETE') {
      return true;
    }
    return false;
  }

  return (
    <IonItem>
      <IonCheckbox checked={isChecked(task)} onClick={check} slot="start" className='ion-margin-end ion-align-items-start' />
      <IonLabel>
        <h2>{ task.title }</h2>
        <IonNote item-start>
          { task.description }
        </IonNote>
        <br />
        <IonNote>
          <IonBadge color='primary'>
            Server version: { task.version }
          </IonBadge>
        </IonNote>
      </IonLabel>
      <IonButtons>
        <Link to={`updateTask/${task.id}`}>
          <IonButton item-start  color='primary' fill="outline">
            <IonIcon icon={create}/>
          </IonButton>
        </Link>
        <IonButton onClick={onDeleteClick} item-start className='trash-button' color='primary' fill="outline">
          <IonIcon icon={trash}/>
        </IonButton>
      </IonButtons>
    </IonItem>
  );

};

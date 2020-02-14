import React, { useState, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { ADD_TASK } from '../gql/queries';
import { mutationOptions } from '../helpers';
import { Header } from '../components/Header';

const AddTask: React.FC<RouteComponentProps> = ({ history }) => {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [addTask] = useOfflineMutation(ADD_TASK, mutationOptions.createTask);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    addTask({
      variables: {
        title,
        description,
        status: 'OPEN',
        version: 1
      },
    });
    history.push('/tasks');
  };
  
  return (
    <>
      <Header title="Add task" backHref="/tasks" />
      <IonContent>
        <form onSubmit={submit} style={{ padding: '0 16px' }}>
          <IonItem>
            <IonLabel color="primary" position="floating">Title</IonLabel>
            <IonInput 
              type="text" 
              required 
              name="title" 
              value={title} 
              onInput={(e:any) => setTitle(e.target.value)} 
            />
          </IonItem>
          <IonItem>
            <IonLabel color="primary" position="floating">Description</IonLabel>
            <IonInput 
              type="text" 
              required 
              name="description" 
              value={description} 
              onInput={(e:any) => setDescription(e.target.value)}
            />
          </IonItem>
          <IonButton className="submit-btn" expand="block" type="submit">Create</IonButton>
        </form>
      </IonContent>
    </>
  )
}

export default AddTask;

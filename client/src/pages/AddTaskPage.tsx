import React, { useState, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
} from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { mutationOptions } from '../helpers';
import { Header } from '../components/Header';
import { createTask } from '../graphql/mutations/createTask';

export const AddTaskPage: React.FC<RouteComponentProps> = ({ history, match }) => {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ showToast, setShowToast ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  const [createTaskMutation] = useOfflineMutation(createTask, mutationOptions.createTask);

  const handleError = (error: any) => {
    if (error.offline) {
      error.watchOfflineChange();
      history.push('/');
      return;
    }
    setErrorMessage(error.message);
    setShowToast(true);
  };

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const variables = {
      input: {
        title,
        description,
        status: 'OPEN',
        version: 1
      },
    };
    
    createTaskMutation({
      variables
    })
    .then(() => history.push('/'))
    .catch(handleError);
  };
  
  return (
    <>
      <Header title="Add task" backHref="/tasks" match={match} />
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
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMessage}
          position="top"
          color="danger"
          duration={2000}
        />
      </IonContent>
    </>
  )
}

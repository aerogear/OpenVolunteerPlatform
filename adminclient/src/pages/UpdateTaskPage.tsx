import React, { useState, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonCard,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonCardHeader,
  IonCardContent,
  IonNote,
  IonBadge,
  IonLoading,
  IonToast,
} from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { useQuery } from '@apollo/react-hooks';
import { Header } from '../components/Header';
import { Empty } from '../components/Empty';
import { mutationOptions } from '../helpers';
import { IUpdateMatchParams } from '../declarations';
import { updateTask } from '../graphql/mutations/updateTask';
import { findTasks } from '../graphql/queries/findTasks';

export const UpdateTaskPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ history, match }) => {

  const { id } = match.params;

  const [title, setTitle] = useState<string>(null!);
  const [description, setDescription] = useState<string>(null!);
  const [ showToast, setShowToast ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const { loading, error, data } = useQuery(findTasks, { 
    variables: { fields: { id } },
    fetchPolicy: 'cache-only',
  });

  const [updateTaskMutation ] = useOfflineMutation(
    updateTask, mutationOptions.updateTask,
  );

  const handleError = (error: any) => {
    if (error.offline) {
      error.watchOfflineChange();
      history.push('/');
      return;
    }
    setErrorMessage(error.message);
    setShowToast(true);
  }

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const task = data.findTasks;
    delete task.__typename;
    const variables = { 
      input: {
        ...task,
        title: title || task.title,
        description: description || task.description,
      }
    };

    updateTaskMutation({
      variables
    })
    .then(() => history.push('/'))
    .catch(handleError);
  }

  if (error) return <pre>{JSON.stringify(error)}</pre>;

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  if (data && data.findTasks) {
    const task = data.findTasks;
    return (
      <>
        <Header title="Update task" backHref="/tasks" match={match} />
        <IonContent>
          <IonCard>
            <IonCardHeader>Task</IonCardHeader>
            <IonCardContent>
              <IonLabel>
                <h2>Title: {task.title}</h2>
                <IonNote>
                  Description: {task.description}
                </IonNote>
                <br />
                <IonNote>
                  <IonBadge color="primary">
                    Version: {task.version}
                  </IonBadge>
                </IonNote>
              </IonLabel>
            </IonCardContent>
          </IonCard>
          <form onSubmit={submit} style={{ padding: '0 16px' }}>
            <IonItem>
              <IonLabel color="primary" position="floating">Title</IonLabel>
              <IonInput type="text" name="title" onInput={(e: any) => setTitle(e.target.value)} value={task.title} />
            </IonItem>
            <IonItem>
              <IonLabel color="primary" position="floating">Description</IonLabel>
              <IonInput type="text" name="description" onInput={(e: any) => setDescription(e.target.value)} value={task.description} />
            </IonItem>
            <IonButton className="submit-btn" expand="block" type="submit">Update</IonButton>
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
  };

  return (
    <>
      <Header title="Update task" backHref="/tasks" match={match} />
      <Empty message={<p>No task found</p>} />
    </>
  );

}

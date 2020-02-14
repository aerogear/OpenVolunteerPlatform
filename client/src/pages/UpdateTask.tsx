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
} from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_TASK, GET_TASK } from '../gql/queries';
import { Header } from '../components/Header';
import { Empty } from '../components/Empty';
import { mutationOptions } from '../helpers';

const UpdateTask: React.FC<RouteComponentProps> = ({ history, match }) => {

  // @ts-ignore
  const { id } = match.params;
  
  const [title, setTitle] = useState<string>(null!);
  const [description, setDescription] = useState<string>(null!);
  const { loading, error, data } = useQuery(GET_TASK, { 
    variables: { id },
    fetchPolicy: 'cache-only',
  });

  const [updateTask] = useOfflineMutation(UPDATE_TASK, mutationOptions.updateTask);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    updateTask({
      variables: {
        ...data.getTask,
        title: title || data.getTask.title,
        description: description || data.getTask.description,
      },
    });
    history.push('/tasks');
  }

  if (error) return <pre>{JSON.stringify(error)}</pre>;

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  if (data && data.getTask) return (
    <>
      <Header title="Update task" backHref="/tasks" />
      <IonContent>
        <IonCard>
          <IonCardHeader>Task</IonCardHeader>
          <IonCardContent>
            <IonLabel>
              <h2>Title: {data.getTask.title}</h2>
              <IonNote>
                Description: {data.getTask.description}
              </IonNote>
              <br />
              <IonNote>
                <IonBadge color="primary">
                  Version: {data.getTask.version}
                </IonBadge>
              </IonNote>
            </IonLabel>
          </IonCardContent>
        </IonCard>
        <form onSubmit={submit} style={{ padding: '0 16px' }}>
          <IonItem>
            <IonLabel color="primary" position="floating">Title</IonLabel>
            <IonInput type="text" name="title" onInput={(e: any) => setTitle(e.target.value)} value={data.getTask.title} />
          </IonItem>
          <IonItem>
            <IonLabel color="primary" position="floating">Description</IonLabel>
            <IonInput type="text" name="description" onInput={(e: any) => setDescription(e.target.value)} value={data.getTask.description} />
          </IonItem>
          <IonButton className="submit-btn" expand="block" type="submit">Update</IonButton>
        </form>
      </IonContent>
    </>
  );

  return (
    <>
      <Header title="Update task" backHref="/tasks" />
      <Empty message={<p>No task found</p>} />
    </>
  );

}

export default UpdateTask;

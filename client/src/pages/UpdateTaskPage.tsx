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
  const { loading, error, data } = useQuery(findTasks, { 
    variables: { fields:  id },
    fetchPolicy: 'cache-only',
  });

  const [updateTaskMutation] = useOfflineMutation(updateTask, mutationOptions.updateTask);

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const task = data.getTask;
    delete task.__typename;
    updateTaskMutation({
      variables: { 
        input: {
          ...task,
          title: title || task.title,
          description: description || task.description,
        }
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
      <Header title="Update task" backHref="/tasks" match={match} />
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
      <Header title="Update task" backHref="/tasks" match={match} />
      <Empty message={<p>No task found</p>} />
    </>
  );

}

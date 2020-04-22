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
  IonToast,
} from '@ionic/react';

import { Header } from '../components/Header';
import { Empty } from '../components/Empty';
import { IUpdateMatchParams } from '../declarations';
import { useFindVolunteerActionQuery } from '../dataFacade'

export const ViewTaskPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ history, match }) => {
  const { data, loading, error } = useFindVolunteerActionQuery({ fetchPolicy: "cache-first" });
  const [showToast, setShowToast] = useState<boolean>(false);

 
  return (
    <>
      <Header title="Update task" backHref="/tasks" match={match} />
      <Empty message={<p>No task found</p>} />
    </>
  );

}

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { add } from 'ionicons/icons';
import { 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonButtons, 
  IonIcon, 
  IonButton, 
  IonMenuButton, 
  IonFooter, 
  IonLoading 
} from '@ionic/react';
import TaskList from '../components/TaskList';
import { GET_TASKS } from '../gql/queries';
import { subscriptionOptions,  } from '../helpers';
import { useSubscribeToMore } from '../hooks';
import { Empty } from '../components/Empty';
import { NetworkBadge } from '../components/NetworkBadge';
import { OfflineQueueBadge } from '../components/OfflineQueueBadge';

const Task: React.FC = () => {

  const { loading, error, data, subscribeToMore } = useQuery(GET_TASKS);
  useSubscribeToMore({ options: Object.values(subscriptionOptions), subscribeToMore});

  if (error) return <pre>{ JSON.stringify(error) }</pre>;

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  if (data && data.allTasks) return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Manage Tasks</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonButton href="/addTask">
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonSegment>
          <IonSegmentButton value="all">
            <IonLabel>All Tasks</IonLabel>
          </IonSegmentButton>
          {/* <IonSegmentButton value="open">
            <IonLabel>Open</IonLabel>
          </IonSegmentButton> */}
        </IonSegment>
      </IonToolbar>
      <TaskList tasks={data.allTasks} />
      <IonFooter>
        <div>
          <OfflineQueueBadge />
          <NetworkBadge />
        </div>
      </IonFooter>
    </IonPage>
  );

  return <Empty message={<p>No tasks available</p>} />
  
};

export default Task;
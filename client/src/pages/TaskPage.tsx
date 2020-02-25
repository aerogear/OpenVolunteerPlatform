import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { add } from 'ionicons/icons';
import { 
  IonPage, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonIcon, 
  IonFooter,
  IonLoading,
  IonFab,
  IonFabButton,
  IonContent,
} from '@ionic/react';
import { subscriptionOptions,  } from '../helpers';
import { useSubscribeToMore } from '../hooks';
import { Empty, TaskList, NetworkBadge, OfflineQueueBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { findAllTasks } from '../graphql/queries/findAllTasks';
import { Link } from 'react-router-dom';

export const TaskPage: React.FC<RouteComponentProps> = ({match}) => {

  const { loading, error, data, subscribeToMore } = useQuery(findAllTasks);
  useSubscribeToMore({ options: Object.values(subscriptionOptions), subscribeToMore});

  if (error) return <pre>{ JSON.stringify(error) }</pre>;

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const content = (data && data.findAllTasks) 
    ? <TaskList tasks={data.findAllTasks} />
    : <Empty message={<p>No tasks available</p>} />;

  return (
    <IonPage>
      <Header title="Manage Tasks"  match={match}  />
      <IonContent className="ion-padding" >
        <IonSegment>
          <IonSegmentButton value="all">
            <IonLabel>All Tasks</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        { content }
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ 'marginBottom': '2em', 'marginRight': '1em' }}>
          <Link to="/addTask">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </Link>
        </IonFab>
      </IonContent>
      <IonFooter>
        <div>
          <OfflineQueueBadge />
          <NetworkBadge />
        </div>
      </IonFooter>
    </IonPage>
  );
  
};

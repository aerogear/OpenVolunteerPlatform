import React, { useState } from 'react';
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
  IonToast,
} from '@ionic/react';
import { subscriptionOptions,  } from '../helpers';
import { useSubscribeToMore } from '../hooks';
import { Empty, TaskList, NetworkBadge, OfflineQueueBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { findAllTasks } from '../graphql/queries/findAllTasks';
import { Link } from 'react-router-dom';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const TaskPage: React.FC<RouteComponentProps> = ({match}) => {

  const isOnline = useNetworkStatus();
  const fetchPolicy = (isOnline) ? 'cache-and-network' : 'cache-only';
  const [ showToast, setShowToast ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  const { loading, error, data, subscribeToMore, refetch } = useQuery(findAllTasks, {
    fetchPolicy
  });
  
  useSubscribeToMore({ options: Object.values(subscriptionOptions), subscribeToMore});

  if (error && !error.networkError) {
    return <pre>{ JSON.stringify(error) }</pre>
  };

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const displayErrorToast = (message: string) => {
    refetch();
    setErrorMessage(message);
    setShowToast(true);
  }

  const content = (data && data.findAllTasks) 
    ? <TaskList tasks={data.findAllTasks} onError={displayErrorToast} />
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
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMessage}
          position="top"
          color="danger"
          duration={2000}
        />
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

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { 
  IonPage, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel,  
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, TaskList, NetworkBadge, OfflineQueueBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { findAllVolounteerActions } from '../graphql/queries/findAllVolounteerActions';
import { useNetworkStatus } from 'react-offix-hooks';

export const TaskPage: React.FC<RouteComponentProps> = ({match}) => {

  const { loading, error, data, subscribeToMore } = useQuery(findAllVolounteerActions, {
    fetchPolicy: 'cache-and-network'
  });
  
  const isOnline = useNetworkStatus();

  if (error && !error.networkError) {
    return <pre>{ JSON.stringify(error) }</pre>
  };

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const content = (data && data.findAllVolounteerActions) 
    ? <TaskList tasks={data.findAllVolounteerActions} />
    : <Empty message={<p>No tasks available</p>} />;

  return (
    <IonPage>
      <Header title="CrisisCommunity Volounteer"  match={match}  isOnline={isOnline} />
      <IonContent className="ion-padding" >
        <IonSegment>
          <IonSegmentButton value="Open">
            <IonLabel>Open Tasks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="closed">
            <IonLabel>Finished Tasks</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        { content }
      </IonContent>
      <IonFooter>
        <div>
          <OfflineQueueBadge isOnline={isOnline} />
          <NetworkBadge isOnline={isOnline} />
        </div>
      </IonFooter>
    </IonPage>
  );
  
};

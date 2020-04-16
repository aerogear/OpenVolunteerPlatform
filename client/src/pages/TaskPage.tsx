import React, { useContext } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter,
  IonLoading,
  IonContent,
} from '@ionic/react';
import { Empty, TaskList, NetworkBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindVolunteersQuery } from '../dataFacade';
import { useNetworkStatus } from 'react-offix-hooks';
import { AuthContext } from '../AuthContext';

export const TaskPage: React.FC<RouteComponentProps> = ({ match, history }) => {
  const { profile } = useContext(AuthContext);

  let { loading, error, data } = useFindVolunteersQuery({
    variables: { fields: { username: profile?.username } },
    fetchPolicy: 'network-only'
  });

  const isOnline = useNetworkStatus();

  if (error && !error.networkError) {
    console.log(JSON.stringify(error))
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  if (!data || !data.findVolunteers || data.findVolunteers.length === 0) {
    history.push("./profile")
    return <div></div>;
  }

  let content;
  const volounteer = data.findVolunteers[0]
  if (volounteer?.actions?.length !== 0) {
    content = <TaskList tasks={volounteer?.actions} />
  } else {
    content = <Empty message={<p>No tasks assigned!</p>} />;
  }

  return (
    <IonPage>
      <Header title="CrisisCommunity Volounteer" match={match} isOnline={isOnline} />
      <IonContent className="ion-padding" >
        <IonSegment>
          <IonSegmentButton value="Open">
            <IonLabel>Open Tasks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="closed">
            <IonLabel>Finished Tasks</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {content}
      </IonContent>
      <IonFooter>
        <div>
          AtCrisisCommunity
          <NetworkBadge isOnline={isOnline} />
        </div>
      </IonFooter>
    </IonPage>
  );

};

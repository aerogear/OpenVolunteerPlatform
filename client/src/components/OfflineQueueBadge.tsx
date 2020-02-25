import React, { useState, useEffect } from 'react';
import { IonLabel, IonButton, IonBadge } from '@ionic/react';
import { useApolloOfflineClient } from 'react-offix-hooks';
import { Link } from 'react-router-dom';

export const OfflineQueueBadge: React.FC<any> = () => {

  const client = useApolloOfflineClient();
  const [queue, setQueue] = useState(0);

  // eslint-disable-next-line
  useEffect(() => {
    setQueue(client.queue.queue.length);
  });

  return (
    <IonLabel>
      <Link to="/offlineQueue">
        <IonButton size="small" color="primary" fill="outline" className="offline-queue-button">
          Offline changes
        </IonButton>
      </Link>
      <IonBadge color="primary" class="offline-queue-badge">
        { queue }
      </IonBadge>
    </IonLabel>
  );

}
import React, { useState, useEffect } from 'react';
import { IonLabel, IonButton, IonBadge } from '@ionic/react';
import { useApolloOfflineClient } from 'react-offix-hooks';

export const OfflineQueueBadge: React.FC<any> = () => {

  const client = useApolloOfflineClient();
  const [queue, setQueue] = useState(0);

  // eslint-disable-next-line
  useEffect(() => {
    setQueue(client.queue.queue.length);
  });

  return (
    <IonLabel>
      <IonButton size="small" color="primary" fill="outline" href="/offlineQueue" className="offline-queue-button">
        Offline changes
            </IonButton>
      <IonBadge color="primary" class="offline-queue-badge">
        { queue }
      </IonBadge>
    </IonLabel>
  );

}
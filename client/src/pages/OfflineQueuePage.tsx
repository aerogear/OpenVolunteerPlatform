import React from 'react';
import { useApolloOfflineClient } from 'react-offix-hooks';
import { Header, OfflineList } from '../components';

export const OfflineQueuePage: React.FC = () => {

  const { queue } = useApolloOfflineClient();

  return (
    <>
      <Header title="Offline Queue" backHref="/tasks" />
      <OfflineList offlineStore={queue.queue} />
    </>
  );
};

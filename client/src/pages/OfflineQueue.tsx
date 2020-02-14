import React from 'react';
import { Header } from '../components/Header';
import { OfflineList } from '../components/OfflineList';
import { useApolloOfflineClient } from 'react-offix-hooks';

const OfflineQueue: React.FC = () => {

  const { queue } = useApolloOfflineClient();

  return (
    <>
      <Header title="Offline Queue" backHref="/tasks" />
      <OfflineList offlineStore={queue.queue} />
    </>
  );
};

export default OfflineQueue;
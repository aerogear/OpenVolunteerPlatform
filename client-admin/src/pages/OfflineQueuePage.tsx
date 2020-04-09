import React from 'react';
import { useApolloOfflineClient } from 'react-offix-hooks';
import { Header, OfflineList } from '../components';
import { RouteComponentProps } from 'react-router';

export const OfflineQueuePage: React.FC<RouteComponentProps> = ({ match }) => {

  const { queue } = useApolloOfflineClient();

  return (
    <>
      <Header title="Offline Queue" backHref="/tasks" match={match} />
      <OfflineList offlineStore={queue.entries} />
    </>
  );
};

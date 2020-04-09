import React, { useEffect, useState } from 'react';
import { Router } from './components';
import { useApolloOfflineClient } from "react-offix-hooks";

// load all styles
import './theme';
import { ConflictListener } from 'offix-client';
import { IonToast } from '@ionic/react';

export const App: React.FC = () => {

  const client = useApolloOfflineClient();
  const [showConflict, setShowConflict] = useState(false);

  useEffect(() => {
    const conflictListener: ConflictListener = {
      mergeOccurred() {
        setShowConflict(true);
      },
      conflictOccurred() {
        setShowConflict(true);
      }
    };
    client.addConflictListener(conflictListener);

    return function cleanup() {
      client.removeConflictListener(conflictListener);
    }
  }, [client]);

  return (
    <>
      <Router />
      <IonToast
        isOpen={showConflict}
        onDidDismiss={() => setShowConflict(false)}
        message="Conflict Occurred 👌👌👌"
        duration={2000}
      />
    </>
  );
};


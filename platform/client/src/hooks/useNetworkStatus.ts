import { NetworkIndicator } from 'offix-datastore/types/replication/network/NetworkIndicator';
import { NetworkStatusEvent } from 'offix-datastore/types/replication/network/NetworkStatus';
import { useCallback, useEffect, useRef, useState } from 'react';
import { datastore } from '../datastore/config';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const indicator = useRef<NetworkIndicator | undefined>();

  const setStatus = useCallback(async (network) => {
    const online = await network?.isOnline();
    setIsOnline(online);
  }, []);

  useEffect(() => {
    if (datastore && !indicator.current) {
      const network = datastore.getNetworkIndicator()
      indicator.current = network;
      setStatus(network);
    }
  })

  useEffect(() => {
    if (indicator && indicator.current) {
      indicator.current?.subscribe({
        next: (event: NetworkStatusEvent) => {
          setIsOnline(event.isOnline);
        }
      });
    }
    return () => {
      indicator.current = undefined;
    }
  });

  return isOnline;
}
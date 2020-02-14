import { useEffect } from 'react';

export const useSubscribeToMore: any = ({ options, subscribeToMore } : { options: any, subscribeToMore: Function }) => {

  useEffect(()=>{
    options.forEach((option: any) => {
      subscribeToMore(option);
    });
  }, [options, subscribeToMore]);

};

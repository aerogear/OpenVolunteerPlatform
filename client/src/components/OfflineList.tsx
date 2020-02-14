import React from 'react';
import { IonItem, IonLabel, IonItemGroup, IonBadge, IonList, IonContent } from '@ionic/react';
import { Empty } from './Empty';

export const OfflineList: React.FC<any> = ({ offlineStore }) => {

  if (!offlineStore) return <h2>Loading...</h2>; 

  if (offlineStore.length === 0) {
    const message = (<p>You currently have no changes<br /> staged offline.</p>);
    return (
      <Empty message={message} />
    )
  };

  return (
    <IonContent className="ion-padding">
      <IonList>
        { 
          offlineStore.map(({ operation }: any, index: any) => {
            const { context, variables } = operation.op;
            const keys = Object.keys(variables);
            return (
              <IonItemGroup key={index}>
                <IonItem>
                  <IonLabel>
                    <h2>
                      Mutation type:
                      <IonBadge color="primary">
                        {context.operationName}
                      </IonBadge>
                    </h2>
                    <ul>
                      {keys.map((key, i) => <li key={i}>{variables[key]}</li>)}
                    </ul>
                  </IonLabel>
                </IonItem>
              </IonItemGroup>
            );
          })
        }
      </IonList>
    </IonContent>
  );


}
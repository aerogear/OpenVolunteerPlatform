import React from 'react';
import { IonList } from '@ionic/react';
import { Empty } from '../generic/Empty';
import { RecipientFieldsFragment } from '../../dataFacade';
import { Recipient } from './Recipient';

export const RecipientList: React.FC<{ recipients: [RecipientFieldsFragment] }> = ({ recipients }) => {
  if (!recipients || recipients.length < 1) {
    const message = (<p>You currently have no recipients.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          recipients.map((recipient: RecipientFieldsFragment) => {
            return <Recipient key={recipient._id} recipient={recipient} />;
          })
        }
      </IonList>
    </>
  );

};

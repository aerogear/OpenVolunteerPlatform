import React from 'react';
import { IonList } from '@ionic/react';
import { Empty } from '../generic/Empty';
import { Volunteer } from './Volunteer';
import { VolunteerFieldsFragment } from '../../dataFacade';

export const VolunteersList: React.FC<{ volunteers: [VolunteerFieldsFragment] }> = ({ volunteers }) => {
  if (!volunteers || volunteers.length < 1) {
    const message = (<p>You currently have no volunteers.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          volunteers.map((volunteer: any) => {
            return <Volunteer key={volunteer._id} volunteer={volunteer} />;
          })
        }
      </IonList>
    </>
  );

};

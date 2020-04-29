import React from 'react';
import { IonList } from '@ionic/react';
import { Empty } from '../Empty';
import { Volunteer } from './Volunteer';
import { VolunteerFieldsFragment } from '../../dataFacade';

export const VolunteersList: React.FC<{ volunteers: [VolunteerFieldsFragment] }> = ({ volunteers }) => {
  if (!volunteers || volunteers.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          volunteers.map((volunteer: any) => {
            return <Volunteer key={volunteer.id} volunteer={volunteer} />;
          })
        }
      </IonList>
    </>
  );

};

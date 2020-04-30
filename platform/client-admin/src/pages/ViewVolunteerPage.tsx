import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useUpdateVolunteerMutation, useFindVolunteersQuery, useFindVolunteersLazyQuery } from '../dataFacade'
import { AutoForm } from 'uniforms-ionic'
import volunteerFormSchema from '../forms/volunteer';
import { volunteerTransformer } from '../transformer/volunteerTransformer';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';

export const ViewVolunteerPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useFindVolunteersQuery({ fetchPolicy: "network-only", variables: { fields: {id: match.params.id}, limit: 1 } });
  
  const [updateVolunteer] = useUpdateVolunteerMutation();
  if (error) {
    console.log(error);
  }

  if (!data || !data.findVolunteers[0]) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  const model = volunteerTransformer(data.findVolunteers[0]);

  return (
    <>
      <Header title="Manage Volunteer" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Volunteer information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={volunteerFormSchema}
                onSubmit={(model: any) => {
                  updateVolunteer({
                    variables: {
                      input: {
                        id: model.id,
                        city: model.city,
                        address1: model.address1,
                        address2: model.address2,
                        dateOfBirth: model.dateOfBirth,
                        canDeliver: model.canDeliver,
                        canPhoneCall: model.canPhoneCall
                      }
                    }
                  }).then(() => {
                    // TODO dialog
                  }).catch((err) => {
                    console.error(err);
                  });
                }}
                showInlineError
                submitField={undefined}
              >
              </AutoForm>
            </IonItemGroup>
          </IonCard>
        </IonList>
      </IonContent>


    </>
  );

}

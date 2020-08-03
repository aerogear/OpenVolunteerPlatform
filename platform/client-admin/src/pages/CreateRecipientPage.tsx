import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useCreateRecipientMutation } from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import recipientFormSchema from '../forms/recipient';
import { IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router';

export const CreateRecipientPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const history = useHistory()
  const [createRecipient] = useCreateRecipientMutation()
  const [model, setModel] = useState({
    lat: 0,
    long: 0
  });

  if (navigator.geolocation) {
    navigator.geolocation
      .getCurrentPosition((location) => {
        setModel({
          lat: location.coords.latitude,
          long: location.coords.longitude
        });

        // TODO - get city and address using Google Map API and put on map
      }, console.error);
  }

  return (
    <>
      <Header title="Create Recipient" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Recipient information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={recipientFormSchema}
                onSubmit={(model: any) => {
                  createRecipient({
                    variables: {
                      input: {
                        address1: model.address1,
                        address2: model.address2,
                        city: model.city,
                        postcode: model.postcode,
                        firstName: model.firstName,
                        lastName: model.lastName,
                        prefferedProducts: model.prefferedProducts,
                        phone: model.phone,
                        lat: model.lat,
                        long: model.long
                      }
                    }
                  }).then(({data}) => {
                    history.push(`/manageRecipient/${data?.createRecipient?._id}`);
                  }).catch(console.error);
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

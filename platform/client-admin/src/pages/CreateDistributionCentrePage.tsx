import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useCreateDistributionCentreMutation } from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import distributionCentreForm from '../forms/distributionCentre';
import { IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router';
import { useState } from 'react';

export const CreateDistributionCentrePage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const history = useHistory();
  const [createDistributionCentre] = useCreateDistributionCentreMutation();

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
      <Header title="Manage Distribution Centre" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Distribution centre information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={distributionCentreForm}
                onSubmit={(model: any) => {
                  createDistributionCentre({
                    variables: {
                      input: {
                        lat: model.lat,
                        city: model.city,
                        long: model.long,
                        name: model.name,
                        address1: model.address1,
                        address2: model.address2,
                        postcode: model.postcode
                      }
                    }
                  }).then(({ data }) => {
                    history.push(`/manageDistributionCentre/${data?.createDistributionCentre?._id}`);
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

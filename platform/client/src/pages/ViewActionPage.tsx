import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Header } from '../components/Header';
import { Map } from '../components/Map';
import { IUpdateMatchParams } from '../declarations';
import { useFindVolunteerActionQuery, useUpdateVolunteerActionMutation } from '../dataFacade'
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic'
import volunteerAction from '../forms/volunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import recipient from '../forms/recipient';
import { Marker } from 'google-maps-react';
import { Empty } from '../components';

export const ViewActionPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useFindVolunteerActionQuery({ fetchPolicy: "cache-first", variables: { id: match.params.id } });
  const [updateAction] = useUpdateVolunteerActionMutation();
  if (error) {
    console.log(error);
  }

  if (!data || !data.findVolunteerActions[0]) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  const model = data.findVolunteerActions[0];

  let mapContent = <Empty />;
  
  if (model.distributionCentre) {
    const distributionCentre = model.distributionCentre;
    const title = `${distributionCentre.address1} ${distributionCentre.address2} ${distributionCentre.city}`;
    mapContent = <Map center={{
      lat: distributionCentre.lat!,
      lng: distributionCentre.long!
    }}>
      <Marker
        label={distributionCentre.name!}
        title={title}
        position={{
          lat: distributionCentre.lat!,
          lng: distributionCentre.long!
        }} />
    </Map>
  }

  return (
    <>
      <Header title="Manage your action" backHref="/actions" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Action information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={volunteerAction}
                onSubmit={(model: any) => {
                  updateAction({
                    variables: {
                      input: {
                        id: model.id,
                        status: model.status
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
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Recipient information</h2>
              </IonItemDivider>
              <AutoForm
                model={model.recipient}
                schema={recipient}
              >
                <AutoFields />
                <ErrorsField />
              </AutoForm>
            </IonItemGroup>
          </IonCard>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Distribution Centre Details</h2>
              </IonItemDivider>
              <AutoForm
                model={model.distributionCentre}
                schema={recipient}
              >
                <AutoFields />
                <ErrorsField />
              </AutoForm>
              {mapContent}
            </IonItemGroup>
          </IonCard>

        </IonList>
      </IonContent>
    </>
  );

}

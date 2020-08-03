import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Header } from '../components/Header';
import { Map, Direction } from '../components/Map';
import { IUpdateMatchParams } from '../declarations';
import { useGetVolunteerActionQuery, useUpdateVolunteerActionMutation, ActionStatus } from '../dataFacade'
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic'
import volunteerAction from '../forms/volunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import recipientForm from '../forms/recipient';
import distributionCentreForm from '../forms/distributionCentre';

// import { Marker } from 'google-maps-react';
import { Empty } from '../components';

export const ViewActionPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useGetVolunteerActionQuery({ fetchPolicy: "cache-first", variables: { id: match.params.id } });
  const [updateAction] = useUpdateVolunteerActionMutation();
  if (error) {
    console.log(error);
  }

  if (!data || !data.getVolunteerAction) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  const model = data.getVolunteerAction;

  let mapContent = <Empty />;
  let distributionCentre;
  let recipient;

  if (model.distributionCentre && model.recipient) {
    distributionCentre = model.distributionCentre;
    recipient = model.recipient;

    // const distributionTitle = `${distributionCentre.address1} ${distributionCentre.address2} ${distributionCentre.city}`;

    // const title = `${recipient.address1} ${recipient.address2} ${recipient?.city}`;

    const origin = [distributionCentre?.lat!, distributionCentre?.long];
    const destination = [recipient?.lat!, recipient?.long!];
    
    mapContent = <Map center={{
      lat: distributionCentre.lat!,
      lng: distributionCentre.long!
    }}>
      {/**
       *  <Marker
        label={distributionCentre.name!}
        title={distributionTitle}
        position={{
          lat: distributionCentre.lat!,
          lng: distributionCentre.long!
        }} />

    <Marker
        label={recipient.firstName!}
        title={title}
        position={{
          lat: recipient.lat!,
          lng: recipient.long!
        }} /> 
       */}
    <Direction origin={origin} destination={destination}/>
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
                        _id: model._id,
                        status: model.status,
                        assignedAt: model.status === ActionStatus.Assigned ? new Date(): undefined,
                        completedAt: model.status === ActionStatus.Completed ? new Date(): undefined
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
                model={recipient}
                schema={recipientForm}
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
                model={distributionCentre}
                schema={distributionCentreForm}
              >
                <AutoFields />
                <ErrorsField />
              </AutoForm>
              <IonCard>
                {mapContent}
              </IonCard>
            </IonItemGroup>
          </IonCard>

        </IonList>
      </IonContent>
    </>
  );

}

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { Map } from '../components/Map';
import { IUpdateMatchParams } from '../declarations';
import { useUpdateVolunteerActionMutation, useFindVolunteerActionDetailsQuery, ActionStatus } from '../dataFacade';
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic';
import volunteerActionForm from '../forms/volunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import recipientForm from '../forms/volunteerActionRecipient';
import { Marker } from 'google-maps-react';
import { Empty } from '../components';

export const ViewActionPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useFindVolunteerActionDetailsQuery({ variables: { id: match.params.id } });
  const [updateAction] = useUpdateVolunteerActionMutation();
  if (error) {
    console.log(error);
  }

  const volunteerAction = data?.getVolunteerAction

  if (!volunteerAction) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  const products = volunteerAction
    .products?.map((volunteerActionProduct) => volunteerActionProduct?.product?.label)
    .join(" , ");

  const model = {
    ...volunteerAction,
    products
  };


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
      <Header title="Manage your action" match={match} />
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
                schema={volunteerActionForm}
                onSubmit={(model: any) => {
                  updateAction({
                    variables: {
                      input: {
                        id: model.id,
                        status: model.status,
                        assignedAt: model.status === ActionStatus.Assigned ? new Date() : undefined,
                        completedAt: model.status === ActionStatus.Completed ? new Date() : undefined
                      }
                    }
                  }).then(() => {
                    // TODO dialog
                  }).catch(console.error);
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

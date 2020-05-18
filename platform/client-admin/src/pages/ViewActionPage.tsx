import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { Map } from '../components/Map';
import { IUpdateMatchParams } from '../declarations';
import { useUpdateVolunteerActionMutation, useFindVolunteerActionDetailsQuery } from '../dataFacade';
import { AutoForm, AutoFields, ErrorsField } from 'uniforms-ionic';
import volunteerActionForm from '../forms/volunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import recipientForm from '../forms/volunteerActionRecipient';

export const ViewActionPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useFindVolunteerActionDetailsQuery({ variables: { id: match.params.id }});
  const [updateAction] = useUpdateVolunteerActionMutation();
  if (error) {
    console.log(error);
  }

  const volunteerAction = data?.findVolunteerActions[0];

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
                        status: model.status
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
              <Map lat={model.distributionCentre?.lat!} long={model.distributionCentre?.long!} name={model.distributionCentre?.name!}></Map>
            </IonItemGroup>
          </IonCard>

        </IonList>
      </IonContent>


    </>
  );

}

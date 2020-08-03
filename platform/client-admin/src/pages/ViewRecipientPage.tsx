import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useGetRecipientQuery, useUpdateRecipientMutation } from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import recipientFormSchema from '../forms/recipient';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';

export const ViewRecipientPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useGetRecipientQuery({ variables: { id: match.params.id  } });
  const [updateRecipient] = useUpdateRecipientMutation()
  if (error) {
    console.log(error);
  }

  const recipient = data?.getRecipient;

  if (!recipient) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  
  const model = recipient;

  return (
    <>
      <Header title="Manage Recipient" match={match} />
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
                  updateRecipient({
                    variables: {
                      input: {
                        _id: model._id,
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
        </IonList>
      </IonContent>


    </>
  );

}

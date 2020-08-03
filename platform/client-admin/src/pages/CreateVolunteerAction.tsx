import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import {
  useFindProductsQuery,
  useFindVolunteersQuery,
  useFindRecipientsQuery,
  useCreateVolunteerActionMutation,
  useFindIdAndNamesOfAllDistributionCentresQuery,
  useCreateVolunteerActionProductMutation,
  ActionStatus
} from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import createVolunteerActionSchema from '../forms/createVolunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router';

export const CreateVolunteerActionPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const history = useHistory();

  const [createVolunteerAction] = useCreateVolunteerActionMutation();
  const [createVolunteerActionProduct] = useCreateVolunteerActionProductMutation();

  const productsQuery = useFindProductsQuery();
  const recipientsQuery = useFindRecipientsQuery();
  const volunteersQuery = useFindVolunteersQuery();
  const distributionCentresQuery = useFindIdAndNamesOfAllDistributionCentresQuery();

  if (productsQuery.error) {
    console.error(productsQuery.error);
  }

  if (recipientsQuery.error) {
    console.error(recipientsQuery.error);
  }

  if (volunteersQuery.error) {
    console.error(volunteersQuery.error);
  }

  if (distributionCentresQuery.error) {
    console.error(distributionCentresQuery.error);
  }

  if (distributionCentresQuery.loading || recipientsQuery.loading || volunteersQuery.loading || productsQuery.loading) {
    return <IonLoading isOpen={true} message={'Loading...'} />;
  }

  const model = {};

  const products = productsQuery.data?.findProducts?.items || [];
  const productsLabels = retrieveProductsLabel(products);

  const recipients = recipientsQuery.data?.findRecipients?.items || [];
  const recipientsNames = retrievePersonNames(recipients);
  const volunteers = volunteersQuery.data?.findVolunteers?.items || [];
  const volunteersNames = retrievePersonNames(volunteers);

  const distributionCentres = distributionCentresQuery.data?.findDistributionCentres?.items || [];
  const distributionCentresNames = distributionCentres.map((distributionCentre) => distributionCentre!!.name as string);
  const createVolunteerActionFormSchema = createVolunteerActionSchema(recipientsNames, volunteersNames, distributionCentresNames, productsLabels);

  return (
    <>
      <Header title="Create Volunteer Action" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Action</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={createVolunteerActionFormSchema}
                onSubmit={(model: any) => {
                  const volunteerId = retrieveIdFromSelectedName(model.volunteerName, volunteers)
                  createVolunteerAction({
                    variables: {
                      input: {
                        title: model.title,
                        description: model.description,
                        status: volunteerId? ActionStatus.Assigned : ActionStatus.Created,
                        _createdAt: new Date(),
                        assignedAt: volunteerId ? new Date(): undefined,
                        distributionCentreId: retrieveDistributionCentreId(model.distributionCentreName, distributionCentres),
                        recipientId: retrieveIdFromSelectedName(model.recipientName, recipients),
                        volunteerId: retrieveIdFromSelectedName(model.volunteerName, volunteers)
                      }
                    }
                  }).then(({ data }) => {
                    const volunteerActionId = data?.createVolunteerAction?._id;
                    // TODO - retrieve products labels from form
                    // See https://github.com/aerogear/OpenVolunteerPlatform/pull/67#discussion_r426658820                    
                    const productsLabels = model.products || [];
                    return Promise.all(
                      retrieveProductIds(products, productsLabels)
                      .map(productId => createVolunteerActionProduct({
                        variables: {
                          input: {
                            productId,
                            volunteerActionId
                          }
                        }
                      }))
                    ).then(() => {
                      history.push(`/viewAction/${volunteerActionId}`);
                    });
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

function retrieveProductsLabel(products: any[]): string[] {
  return products.map(({ label }) => label);
}

function retrievePersonNames(persons: any[]): string[] {
  return persons.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
}

function retrieveDistributionCentreId(distributionCentreName: string, distributionCentres: any[]) {
  if (!distributionCentreName) {
    return undefined;
  }

  const distributionCentre = distributionCentres.find((distributionCentre) => {
    const name = distributionCentre?.name || "";
    return name.includes(distributionCentreName);
  });

  return distributionCentre?._id;
}


function retrieveIdFromSelectedName(selectedName: string, persons: any[]) {
  if (!selectedName) {
    return undefined;
  }
  const correspondingPerson = persons
    .find(({ firstName, lastName }) => `${firstName} ${lastName}` === selectedName);

  return correspondingPerson?._id;
}

function retrieveProductIds(products: any[], productsLabels: string[]): string[] {
  return products
  .filter(({ label }) => productsLabels.includes(label))
  .map(({ id }) => id);
}

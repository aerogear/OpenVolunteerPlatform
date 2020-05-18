import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import {
  useFindAllProductsQuery,
  useFindAllVolunteersQuery,
  useFindAllRecipientsQuery,
  useCreateVolunteerActionMutation,
  useFindIdAndNamesOfAllDistributionCentresQuery,
  ActionStatus
} from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import createVolunteerActionSchema from '../forms/createVolunteerAction';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router';

export const CreateVolunteerActionPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const history = useHistory();

  const [createVolunteerAction] = useCreateVolunteerActionMutation();

  const productsQuery = useFindAllProductsQuery();
  const recipientsQuery = useFindAllRecipientsQuery();
  const volunteersQuery = useFindAllVolunteersQuery();
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

  const products = productsQuery.data?.findAllProducts || [];
  const productsLabels = retrieveProductsLabel(products);

  const recipients = recipientsQuery.data?.findAllRecipients || [];
  const recipientsNames = retrievePersonNames(recipients);
  const volunteers = volunteersQuery.data?.findAllVolunteers || [];
  const volunteersNames = retrievePersonNames(volunteers);

  const distributionCentres = distributionCentresQuery.data?.findAllDistributionCentres || [];
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
                  createVolunteerAction({
                    variables: {
                      input: {
                        title: model.title,
                        description: model.description,
                        status: ActionStatus.Created,
                        createdAt: new Date(),
                        distributionCentreId: retrieveDistributionCentreId(model.distributionCentreName, distributionCentres),
                        recipientId: retrieveIdFromSelectedName(model.recipientName, recipients),
                        volunteerId: retrieveIdFromSelectedName(model.volunteerName, volunteers)
                      }
                    }
                  }).then(({ data }) => {
                    history.push(`/viewAction/${data?.createVolunteerAction.id}`);
                    // TODO - add products to volunteer action. See https://github.com/aerogear/OpenVolunteerPlatform/pull/67#discussion_r426658820
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

  return distributionCentre?.id;
}


function retrieveIdFromSelectedName(selectedName: string, persons: any[]) {
  if (!selectedName) {
    return undefined;
  }
  const correspondingPerson = persons
    .find(({ firstName, lastName }) => `${firstName} ${lastName}` === selectedName);

  return correspondingPerson?.id;
}

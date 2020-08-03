import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useFindIdAndNamesOfAllDistributionCentresQuery, useCreateProductMutation } from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import createProductSchema from '../forms/product';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';
import { useHistory } from 'react-router';

export const CreateProductPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const history = useHistory();
  const { data, loading, error } = useFindIdAndNamesOfAllDistributionCentresQuery();
  const [createProduct] = useCreateProductMutation();
  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
  
  const model = {};
  const distributionCentres = data?.findDistributionCentres?.items || [];
  const distributionCentresNames = distributionCentres
  .map((distributionCentre) => distributionCentre!!.name as string);
  const productFormSchema = createProductSchema(distributionCentresNames,"")
  
  return (
    <>
      <Header title="Create Product" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Product creation</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={productFormSchema}
                onSubmit={(model: any) => {
                  createProduct({
                    variables: {
                      input: {
                        label: model.label,
                        description: model.description,
                        distributionCentreId: retrieveDistributionCentreId(model.distributionCentre, distributionCentres)
                      }
                    }
                  }).then(({data}) => {
                    history.push(`/manageProduct/${data?.createProduct?._id}`)
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

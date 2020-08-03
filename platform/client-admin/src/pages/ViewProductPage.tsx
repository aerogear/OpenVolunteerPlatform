import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../components/Header';
import { IUpdateMatchParams } from '../declarations';
import { useGetProductQuery, useUpdateProductMutation, useFindIdAndNamesOfAllDistributionCentresQuery } from '../dataFacade';
import { AutoForm } from 'uniforms-ionic';
import createProductSchema from '../forms/product';
import { IonLoading, IonContent, IonList, IonCard, IonItemGroup, IonItemDivider } from '@ionic/react';

export const ViewProductPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ match }) => {
  const { data, loading, error } = useGetProductQuery({ variables: {  id: match.params.id } });
  const distibutionCentresQuery = useFindIdAndNamesOfAllDistributionCentresQuery()

  const [updateProduct] = useUpdateProductMutation();
  if (error || distibutionCentresQuery.error) {
    console.log(error);
  }

  const product = data?.getProduct;

  if (!product) {
    return <div>Cannot fetch element with provided id</div>
  }

  if (loading || distibutionCentresQuery.loading) return <IonLoading isOpen={loading} message={'Loading...'} />;

  const model = {
    id: product._id,
    label: product.label,
    description: product.description,
    distributionCentre: product.distributionCentre?.name
  };

  const distributionCentres = distibutionCentresQuery.data?.findDistributionCentres.items || [];
  const distributionCentresNames = distributionCentres.map((distributionCentre) => distributionCentre!!.name as string)
  const productFormSchema = createProductSchema(distributionCentresNames,"")
  
  return (
    <>
      <Header title="Manage Product" match={match} />
      <IonContent>
        <IonList>
          <IonCard>
            <IonItemGroup>
              <IonItemDivider color="light">
                <h2>Product information</h2>
              </IonItemDivider>
              <AutoForm
                placeholder
                model={model}
                schema={productFormSchema}
                onSubmit={(model: any) => {
                  let distributionCentre;

                  if (model.distributionCentre) {
                    distributionCentre = distributionCentres
                      .find((centre) => {
                        const name = centre?.name || ""
                        return name.includes(model.distributionCentre.trim())
                      })
                  }

                  distributionCentre = distributionCentre || product.distributionCentre

                  const distributionCentreId = distributionCentre?._id;

                  updateProduct({
                    variables: {
                      input: {
                        _id: model._id,
                        label: model.label,
                        description: model.description,
                        distributionCentreId
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

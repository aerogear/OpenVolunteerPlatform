import React from 'react';
import {
  IonPage,
  IonFooter,
  IonLoading,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { useFindProductsQuery } from '../dataFacade';
import { ProductList } from '../components/model/ProductList';
import { add } from 'ionicons/icons';


export const ProductsPage: React.FC<RouteComponentProps> = ({ match }) => {
  let { data, loading, error } = useFindProductsQuery();

  if (error) {
    console.log(error);
  }

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const products = data?.findProducts?.items || [];
  const content = <ProductList products={products as any} />
  
  return (
    <IonPage>
      <Header title="List of Products" match={match} />
      <IonContent className="ion-padding" >
        {content}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="createProduct">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <div>
          OpenVolunteer Platform
        </div>
      </IonFooter>
    </IonPage >
  );

};

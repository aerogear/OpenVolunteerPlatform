import React from 'react';
import { IonList } from '@ionic/react';
import { Empty } from '../generic/Empty';
import { ProductFieldsFragment } from '../../dataFacade';
import { Product } from './Product';

export const ProductList: React.FC<{ products: [ProductFieldsFragment] }> = ({ products }) => {
  if (!products || products.length < 1) {
    const message = (<p>You currently have no products.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          products.map((product: ProductFieldsFragment) => {
            return <Product key={product._id} product={product} />;
          })
        }
      </IonList>
    </>
  );

};

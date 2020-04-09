import gql from "graphql-tag"

export const ProductStockExpandedFragment = gql`
  fragment ProductStockExpandedFields on ProductStock {
   id
   amount
   product {
      id
      name
      version
   }
   distributionCentre {
      id
      name
      address
      lat
      long
      version
   }   
   version

} 
`

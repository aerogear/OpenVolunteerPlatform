import gql from "graphql-tag"

export const ProductStockFragment = gql`
  fragment ProductStockFields on ProductStock {
   id
   amount
   version

} 
`

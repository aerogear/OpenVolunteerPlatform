import gql from "graphql-tag"
import { ProductStockFragment } from "../fragments/ProductStock"

export const updateProductStock = gql`
  mutation updateProductStock($input: ProductStockInput!) {
  updateProductStock(input: $input) {
      ...ProductStockFields
  }
}


  ${ProductStockFragment}
`

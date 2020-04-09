import gql from "graphql-tag"
import { ProductStockFragment } from "../fragments/ProductStock"

export const deleteProductStock = gql`
  mutation deleteProductStock($input: ProductStockInput!) {
  deleteProductStock(input: $input) {
      ...ProductStockFields
  }
}


  ${ProductStockFragment}
`

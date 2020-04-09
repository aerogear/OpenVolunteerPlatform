import gql from "graphql-tag"
import { ProductStockFragment } from "../fragments/ProductStock"

export const createProductStock = gql`
  mutation createProductStock($input: ProductStockInput!) {
  createProductStock(input: $input) {
      ...ProductStockFields
  }
}


  ${ProductStockFragment}
`

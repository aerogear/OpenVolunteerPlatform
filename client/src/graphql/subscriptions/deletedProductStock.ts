import gql from "graphql-tag"
import { ProductStockFragment } from "../fragments/ProductStock"

export const deletedProductStock = gql`
  subscription deletedProductStock {
  deletedProductStock {
      ...ProductStockFields
  }
} 

  ${ProductStockFragment}
`

import gql from "graphql-tag"
import { ProductStockFragment } from "../fragments/ProductStock"

export const newProductStock = gql`
  subscription newProductStock {
  newProductStock {
      ...ProductStockFields
  }
} 

  ${ProductStockFragment}
`

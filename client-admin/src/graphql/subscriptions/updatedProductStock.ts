import gql from "graphql-tag"
import { ProductStockFragment } from "../fragments/ProductStock"

export const updatedProductStock = gql`
  subscription updatedProductStock {
  updatedProductStock {
      ...ProductStockFields
  }
} 

  ${ProductStockFragment}
`

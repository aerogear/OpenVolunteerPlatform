import gql from "graphql-tag"
import { ProductFragment } from "../fragments/Product"

export const updatedProduct = gql`
  subscription updatedProduct {
  updatedProduct {
      ...ProductFields
  }
} 

  ${ProductFragment}
`

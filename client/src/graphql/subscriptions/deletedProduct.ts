import gql from "graphql-tag"
import { ProductFragment } from "../fragments/Product"

export const deletedProduct = gql`
  subscription deletedProduct {
  deletedProduct {
      ...ProductFields
  }
} 

  ${ProductFragment}
`

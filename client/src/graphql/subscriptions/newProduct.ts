import gql from "graphql-tag"
import { ProductFragment } from "../fragments/Product"

export const newProduct = gql`
  subscription newProduct {
  newProduct {
      ...ProductFields
  }
} 

  ${ProductFragment}
`

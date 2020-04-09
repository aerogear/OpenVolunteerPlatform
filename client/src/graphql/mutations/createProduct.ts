import gql from "graphql-tag"
import { ProductFragment } from "../fragments/Product"

export const createProduct = gql`
  mutation createProduct($input: ProductInput!) {
  createProduct(input: $input) {
      ...ProductFields
  }
}


  ${ProductFragment}
`

import gql from "graphql-tag"
import { ProductFragment } from "../fragments/Product"

export const updateProduct = gql`
  mutation updateProduct($input: ProductInput!) {
  updateProduct(input: $input) {
      ...ProductFields
  }
}


  ${ProductFragment}
`

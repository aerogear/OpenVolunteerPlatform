import gql from "graphql-tag"
import { ProductFragment } from "../fragments/Product"

export const deleteProduct = gql`
  mutation deleteProduct($input: ProductInput!) {
  deleteProduct(input: $input) {
      ...ProductFields
  }
}


  ${ProductFragment}
`

import gql from "graphql-tag"
import { ProductExpandedFragment } from "../fragments/ProductExpanded"

export const findAllProducts = gql`
  query findAllProducts($limit: Int, $offset: Int) {
    findAllProducts(limit: $limit, offset: $offset) {
      ...ProductExpandedFields
    }
  }

  ${ProductExpandedFragment}
`

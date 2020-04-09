import gql from "graphql-tag"
import { ProductExpandedFragment } from "../fragments/ProductExpanded"

export const findProducts = gql`
  query findProducts($fields: ProductInput!, $limit: Int, $offset: Int) {
    findProducts(fields: $fields, limit: $limit, offset: $offset) {
      ...ProductExpandedFields
    }
  }

  ${ProductExpandedFragment}
`

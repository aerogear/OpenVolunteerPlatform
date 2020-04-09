import gql from "graphql-tag"
import { ProductStockExpandedFragment } from "../fragments/ProductStockExpanded"

export const findProductStocks = gql`
  query findProductStocks($fields: ProductStockInput!, $limit: Int, $offset: Int) {
    findProductStocks(fields: $fields, limit: $limit, offset: $offset) {
      ...ProductStockExpandedFields
    }
  }

  ${ProductStockExpandedFragment}
`

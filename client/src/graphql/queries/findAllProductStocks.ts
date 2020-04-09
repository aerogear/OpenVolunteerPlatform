import gql from "graphql-tag"
import { ProductStockExpandedFragment } from "../fragments/ProductStockExpanded"

export const findAllProductStocks = gql`
  query findAllProductStocks($limit: Int, $offset: Int) {
    findAllProductStocks(limit: $limit, offset: $offset) {
      ...ProductStockExpandedFields
    }
  }

  ${ProductStockExpandedFragment}
`

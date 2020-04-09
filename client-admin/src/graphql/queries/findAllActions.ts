import gql from "graphql-tag"
import { ActionExpandedFragment } from "../fragments/ActionExpanded"

export const findAllActions = gql`
  query findAllActions($limit: Int, $offset: Int) {
    findAllActions(limit: $limit, offset: $offset) {
      ...ActionExpandedFields
    }
  }

  ${ActionExpandedFragment}
`

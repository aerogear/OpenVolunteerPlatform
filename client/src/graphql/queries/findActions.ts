import gql from "graphql-tag"
import { ActionExpandedFragment } from "../fragments/ActionExpanded"

export const findActions = gql`
  query findActions($fields: ActionInput!, $limit: Int, $offset: Int) {
    findActions(fields: $fields, limit: $limit, offset: $offset) {
      ...ActionExpandedFields
    }
  }

  ${ActionExpandedFragment}
`

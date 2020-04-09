import gql from "graphql-tag"
import { VolounteerActionExpandedFragment } from "../fragments/VolounteerActionExpanded"

export const findVolounteerActions = gql`
  query findVolounteerActions($fields: VolounteerActionInput!, $limit: Int, $offset: Int) {
    findVolounteerActions(fields: $fields, limit: $limit, offset: $offset) {
      ...VolounteerActionExpandedFields
    }
  }

  ${VolounteerActionExpandedFragment}
`

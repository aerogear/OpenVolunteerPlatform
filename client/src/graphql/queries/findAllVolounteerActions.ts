import gql from "graphql-tag"
import { VolounteerActionExpandedFragment } from "../fragments/VolounteerActionExpanded"

export const findAllVolounteerActions = gql`
  query findAllVolounteerActions($limit: Int, $offset: Int) {
    findAllVolounteerActions(limit: $limit, offset: $offset) {
      ...VolounteerActionExpandedFields
    }
  }

  ${VolounteerActionExpandedFragment}
`

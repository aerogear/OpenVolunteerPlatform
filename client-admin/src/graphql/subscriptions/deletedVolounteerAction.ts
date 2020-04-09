import gql from "graphql-tag"
import { VolounteerActionFragment } from "../fragments/VolounteerAction"

export const deletedVolounteerAction = gql`
  subscription deletedVolounteerAction {
  deletedVolounteerAction {
      ...VolounteerActionFields
  }
} 

  ${VolounteerActionFragment}
`

import gql from "graphql-tag"
import { VolounteerActionFragment } from "../fragments/VolounteerAction"

export const newVolounteerAction = gql`
  subscription newVolounteerAction {
  newVolounteerAction {
      ...VolounteerActionFields
  }
} 

  ${VolounteerActionFragment}
`

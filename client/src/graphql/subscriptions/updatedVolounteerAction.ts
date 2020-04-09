import gql from "graphql-tag"
import { VolounteerActionFragment } from "../fragments/VolounteerAction"

export const updatedVolounteerAction = gql`
  subscription updatedVolounteerAction {
  updatedVolounteerAction {
      ...VolounteerActionFields
  }
} 

  ${VolounteerActionFragment}
`

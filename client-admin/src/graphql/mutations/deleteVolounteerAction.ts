import gql from "graphql-tag"
import { VolounteerActionFragment } from "../fragments/VolounteerAction"

export const deleteVolounteerAction = gql`
  mutation deleteVolounteerAction($input: VolounteerActionInput!) {
  deleteVolounteerAction(input: $input) {
      ...VolounteerActionFields
  }
}


  ${VolounteerActionFragment}
`

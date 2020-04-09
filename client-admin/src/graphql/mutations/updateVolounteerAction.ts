import gql from "graphql-tag"
import { VolounteerActionFragment } from "../fragments/VolounteerAction"

export const updateVolounteerAction = gql`
  mutation updateVolounteerAction($input: VolounteerActionInput!) {
  updateVolounteerAction(input: $input) {
      ...VolounteerActionFields
  }
}


  ${VolounteerActionFragment}
`

import gql from "graphql-tag"
import { VolounteerActionFragment } from "../fragments/VolounteerAction"

export const createVolounteerAction = gql`
  mutation createVolounteerAction($input: VolounteerActionInput!) {
  createVolounteerAction(input: $input) {
      ...VolounteerActionFields
  }
}


  ${VolounteerActionFragment}
`

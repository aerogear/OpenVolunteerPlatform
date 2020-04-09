import gql from "graphql-tag"
import { RecieverFragment } from "../fragments/Reciever"

export const createReciever = gql`
  mutation createReciever($input: RecieverInput!) {
  createReciever(input: $input) {
      ...RecieverFields
  }
}


  ${RecieverFragment}
`

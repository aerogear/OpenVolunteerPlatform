import gql from "graphql-tag"
import { RecieverFragment } from "../fragments/Reciever"

export const updateReciever = gql`
  mutation updateReciever($input: RecieverInput!) {
  updateReciever(input: $input) {
      ...RecieverFields
  }
}


  ${RecieverFragment}
`

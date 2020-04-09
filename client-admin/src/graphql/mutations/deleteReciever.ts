import gql from "graphql-tag"
import { RecieverFragment } from "../fragments/Reciever"

export const deleteReciever = gql`
  mutation deleteReciever($input: RecieverInput!) {
  deleteReciever(input: $input) {
      ...RecieverFields
  }
}


  ${RecieverFragment}
`

import gql from "graphql-tag"
import { RecieverFragment } from "../fragments/Reciever"

export const deletedReciever = gql`
  subscription deletedReciever {
  deletedReciever {
      ...RecieverFields
  }
} 

  ${RecieverFragment}
`

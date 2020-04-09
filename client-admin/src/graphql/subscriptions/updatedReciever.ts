import gql from "graphql-tag"
import { RecieverFragment } from "../fragments/Reciever"

export const updatedReciever = gql`
  subscription updatedReciever {
  updatedReciever {
      ...RecieverFields
  }
} 

  ${RecieverFragment}
`

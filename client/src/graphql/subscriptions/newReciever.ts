import gql from "graphql-tag"
import { RecieverFragment } from "../fragments/Reciever"

export const newReciever = gql`
  subscription newReciever {
  newReciever {
      ...RecieverFields
  }
} 

  ${RecieverFragment}
`

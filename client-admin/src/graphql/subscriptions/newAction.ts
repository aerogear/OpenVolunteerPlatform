import gql from "graphql-tag"
import { ActionFragment } from "../fragments/Action"

export const newAction = gql`
  subscription newAction {
  newAction {
      ...ActionFields
  }
} 

  ${ActionFragment}
`

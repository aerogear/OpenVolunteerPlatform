import gql from "graphql-tag"
import { ActionFragment } from "../fragments/Action"

export const deletedAction = gql`
  subscription deletedAction {
  deletedAction {
      ...ActionFields
  }
} 

  ${ActionFragment}
`

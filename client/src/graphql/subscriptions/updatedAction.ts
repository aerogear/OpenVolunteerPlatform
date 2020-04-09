import gql from "graphql-tag"
import { ActionFragment } from "../fragments/Action"

export const updatedAction = gql`
  subscription updatedAction {
  updatedAction {
      ...ActionFields
  }
} 

  ${ActionFragment}
`

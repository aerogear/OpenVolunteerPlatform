import gql from "graphql-tag"
import { ActionFragment } from "../fragments/Action"

export const deleteAction = gql`
  mutation deleteAction($input: ActionInput!) {
  deleteAction(input: $input) {
      ...ActionFields
  }
}


  ${ActionFragment}
`

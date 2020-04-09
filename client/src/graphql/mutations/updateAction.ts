import gql from "graphql-tag"
import { ActionFragment } from "../fragments/Action"

export const updateAction = gql`
  mutation updateAction($input: ActionInput!) {
  updateAction(input: $input) {
      ...ActionFields
  }
}


  ${ActionFragment}
`

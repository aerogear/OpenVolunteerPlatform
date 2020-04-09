import gql from "graphql-tag"
import { ActionFragment } from "../fragments/Action"

export const createAction = gql`
  mutation createAction($input: ActionInput!) {
  createAction(input: $input) {
      ...ActionFields
  }
}


  ${ActionFragment}
`

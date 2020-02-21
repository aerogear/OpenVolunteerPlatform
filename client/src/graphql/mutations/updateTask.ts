import gql from "graphql-tag"
import { TaskFragment } from "../fragments/Task"

export const updateTask = gql`
  mutation updateTask($input: TaskInput!) {
  updateTask(input: $input) {
      ...TaskFields
  }
}


  ${TaskFragment}
`

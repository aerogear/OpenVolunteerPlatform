import gql from "graphql-tag"
import { TaskFragment } from "../fragments/Task"

export const deleteTask = gql`
  mutation deleteTask($input: TaskInput!) {
  deleteTask(input: $input) {
      ...TaskFields
  }
}


  ${TaskFragment}
`

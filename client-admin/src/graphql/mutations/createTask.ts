import gql from "graphql-tag"
import { TaskFragment } from "../fragments/Task"

export const createTask = gql`
  mutation createTask($input: TaskInput!) {
  createTask(input: $input) {
      ...TaskFields
  }
}


  ${TaskFragment}
`

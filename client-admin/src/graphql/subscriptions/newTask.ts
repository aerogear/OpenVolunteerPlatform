import gql from "graphql-tag"
import { TaskFragment } from "../fragments/Task"

export const newTask = gql`
  subscription newTask {
  newTask {
      ...TaskFields
  }
} 

  ${TaskFragment}
`

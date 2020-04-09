import gql from "graphql-tag"
import { TaskFragment } from "../fragments/Task"

export const updatedTask = gql`
  subscription updatedTask {
  updatedTask {
      ...TaskFields
  }
} 

  ${TaskFragment}
`

import gql from "graphql-tag"
import { TaskFragment } from "../fragments/Task"

export const deletedTask = gql`
  subscription deletedTask {
  deletedTask {
      ...TaskFields
  }
} 

  ${TaskFragment}
`

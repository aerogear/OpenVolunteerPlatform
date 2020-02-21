import gql from "graphql-tag"
import { TaskExpandedFragment } from "../fragments/TaskExpanded"

export const findTasks = gql`
  query findTasks($fields: TaskFields!) {
    findTasks(fields: $fields) {
      ...TaskExpandedFields
    }
  }

  ${TaskExpandedFragment}
`

import gql from "graphql-tag"
import { TaskExpandedFragment } from "../fragments/TaskExpanded"

export const findTasks = gql`

  query findTasks($fields: TaskInput!) {
    findTasks(fields: $fields) {
      ...TaskExpandedFields
    }
  }
  
  ${TaskExpandedFragment}
`

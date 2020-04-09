import gql from "graphql-tag"
import { TaskExpandedFragment } from "../fragments/TaskExpanded"

export const findTasks = gql`
  query findTasks($fields: TaskInput!, $limit: Int, $offset: Int) {
    findTasks(fields: $fields, limit: $limit, offset: $offset) {
      ...TaskExpandedFields
    }
  }

  ${TaskExpandedFragment}
`

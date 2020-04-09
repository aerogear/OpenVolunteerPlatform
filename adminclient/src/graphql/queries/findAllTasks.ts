import gql from "graphql-tag"
import { TaskExpandedFragment } from "../fragments/TaskExpanded"

export const findAllTasks = gql`
  query findAllTasks($limit: Int, $offset: Int) {
    findAllTasks(limit: $limit, offset: $offset) {
      ...TaskExpandedFields
    }
  }

  ${TaskExpandedFragment}
`

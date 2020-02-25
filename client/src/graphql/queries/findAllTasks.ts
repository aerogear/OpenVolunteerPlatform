import gql from "graphql-tag"
import { TaskExpandedFragment } from "../fragments/TaskExpanded"

export const findAllTasks = gql`
  query findAllTasks {
    findAllTasks {
      ...TaskExpandedFields
    }
  }

  ${TaskExpandedFragment}
`

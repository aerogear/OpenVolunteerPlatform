import gql from "graphql-tag"
import { VolunteerActionExpandedFragment } from "../fragments/VolunteerActionExpanded"

export const findAllVolunteerActions = gql`
  query findAllVolunteerActions($limit: Int, $offset: Int) {
    findAllVolunteerActions(limit: $limit, offset: $offset) {
      ...VolunteerActionExpandedFields
    }
  }

  ${VolunteerActionExpandedFragment}
`

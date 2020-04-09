import gql from "graphql-tag"
import { VolunteerExpandedFragment } from "../fragments/VolunteerExpanded"

export const findAllVolunteers = gql`
  query findAllVolunteers($limit: Int, $offset: Int) {
    findAllVolunteers(limit: $limit, offset: $offset) {
      ...VolunteerExpandedFields
    }
  }

  ${VolunteerExpandedFragment}
`

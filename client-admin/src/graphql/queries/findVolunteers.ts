import gql from "graphql-tag"
import { VolunteerExpandedFragment } from "../fragments/VolunteerExpanded"

export const findVolunteers = gql`
  query findVolunteers($fields: VolunteerInput!, $limit: Int, $offset: Int) {
    findVolunteers(fields: $fields, limit: $limit, offset: $offset) {
      ...VolunteerExpandedFields
    }
  }

  ${VolunteerExpandedFragment}
`

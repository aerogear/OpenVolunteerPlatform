import gql from "graphql-tag"
import { VolunteerActionExpandedFragment } from "../fragments/VolunteerActionExpanded"

export const findVolunteerActions = gql`
  query findVolunteerActions($fields: VolunteerActionInput!, $limit: Int, $offset: Int) {
    findVolunteerActions(fields: $fields, limit: $limit, offset: $offset) {
      ...VolunteerActionExpandedFields
    }
  }

  ${VolunteerActionExpandedFragment}
`

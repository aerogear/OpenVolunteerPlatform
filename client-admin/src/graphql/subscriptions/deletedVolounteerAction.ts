import gql from "graphql-tag"
import { VolunteerActionFragment } from "../fragments/VolunteerAction"

export const deletedVolunteerAction = gql`
  subscription deletedVolunteerAction {
  deletedVolunteerAction {
      ...VolunteerActionFields
  }
} 

  ${VolunteerActionFragment}
`

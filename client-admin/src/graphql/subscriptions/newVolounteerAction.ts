import gql from "graphql-tag"
import { VolunteerActionFragment } from "../fragments/VolunteerAction"

export const newVolunteerAction = gql`
  subscription newVolunteerAction {
  newVolunteerAction {
      ...VolunteerActionFields
  }
} 

  ${VolunteerActionFragment}
`

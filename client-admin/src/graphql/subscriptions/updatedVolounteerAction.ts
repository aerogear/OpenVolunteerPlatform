import gql from "graphql-tag"
import { VolunteerActionFragment } from "../fragments/VolunteerAction"

export const updatedVolunteerAction = gql`
  subscription updatedVolunteerAction {
  updatedVolunteerAction {
      ...VolunteerActionFields
  }
} 

  ${VolunteerActionFragment}
`

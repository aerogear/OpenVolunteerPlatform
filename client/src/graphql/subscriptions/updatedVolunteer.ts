import gql from "graphql-tag"
import { VolunteerFragment } from "../fragments/Volunteer"

export const updatedVolunteer = gql`
  subscription updatedVolunteer {
  updatedVolunteer {
      ...VolunteerFields
  }
} 

  ${VolunteerFragment}
`

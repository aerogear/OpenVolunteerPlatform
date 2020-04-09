import gql from "graphql-tag"
import { VolunteerFragment } from "../fragments/Volunteer"

export const newVolunteer = gql`
  subscription newVolunteer {
  newVolunteer {
      ...VolunteerFields
  }
} 

  ${VolunteerFragment}
`

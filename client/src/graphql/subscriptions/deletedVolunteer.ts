import gql from "graphql-tag"
import { VolunteerFragment } from "../fragments/Volunteer"

export const deletedVolunteer = gql`
  subscription deletedVolunteer {
  deletedVolunteer {
      ...VolunteerFields
  }
} 

  ${VolunteerFragment}
`

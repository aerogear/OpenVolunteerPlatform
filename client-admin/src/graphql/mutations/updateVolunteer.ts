import gql from "graphql-tag"
import { VolunteerFragment } from "../fragments/Volunteer"

export const updateVolunteer = gql`
  mutation updateVolunteer($input: VolunteerInput!) {
  updateVolunteer(input: $input) {
      ...VolunteerFields
  }
}


  ${VolunteerFragment}
`

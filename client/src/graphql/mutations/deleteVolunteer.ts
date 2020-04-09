import gql from "graphql-tag"
import { VolunteerFragment } from "../fragments/Volunteer"

export const deleteVolunteer = gql`
  mutation deleteVolunteer($input: VolunteerInput!) {
  deleteVolunteer(input: $input) {
      ...VolunteerFields
  }
}


  ${VolunteerFragment}
`

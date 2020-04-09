import gql from "graphql-tag"
import { VolunteerFragment } from "../fragments/Volunteer"

export const createVolunteer = gql`
  mutation createVolunteer($input: VolunteerInput!) {
  createVolunteer(input: $input) {
      ...VolunteerFields
  }
}


  ${VolunteerFragment}
`

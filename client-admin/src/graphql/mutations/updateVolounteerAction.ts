import gql from "graphql-tag"
import { VolunteerActionFragment } from "../fragments/VolunteerAction"

export const updateVolunteerAction = gql`
  mutation updateVolunteerAction($input: VolunteerActionInput!) {
  updateVolunteerAction(input: $input) {
      ...VolunteerActionFields
  }
}


  ${VolunteerActionFragment}
`

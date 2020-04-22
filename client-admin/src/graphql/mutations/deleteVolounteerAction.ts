import gql from "graphql-tag"
import { VolunteerActionFragment } from "../fragments/VolunteerAction"

export const deleteVolunteerAction = gql`
  mutation deleteVolunteerAction($input: VolunteerActionInput!) {
  deleteVolunteerAction(input: $input) {
      ...VolunteerActionFields
  }
}


  ${VolunteerActionFragment}
`

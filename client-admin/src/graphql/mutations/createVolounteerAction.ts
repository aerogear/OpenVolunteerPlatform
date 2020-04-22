import gql from "graphql-tag"
import { VolunteerActionFragment } from "../fragments/VolunteerAction"

export const createVolunteerAction = gql`
  mutation createVolunteerAction($input: VolunteerActionInput!) {
  createVolunteerAction(input: $input) {
      ...VolunteerActionFields
  }
}


  ${VolunteerActionFragment}
`

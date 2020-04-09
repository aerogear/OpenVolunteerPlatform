import gql from "graphql-tag"
import { DistributionCentreFragment } from "../fragments/DistributionCentre"

export const deleteDistributionCentre = gql`
  mutation deleteDistributionCentre($input: DistributionCentreInput!) {
  deleteDistributionCentre(input: $input) {
      ...DistributionCentreFields
  }
}


  ${DistributionCentreFragment}
`

import gql from "graphql-tag"
import { DistributionCentreFragment } from "../fragments/DistributionCentre"

export const createDistributionCentre = gql`
  mutation createDistributionCentre($input: DistributionCentreInput!) {
  createDistributionCentre(input: $input) {
      ...DistributionCentreFields
  }
}


  ${DistributionCentreFragment}
`

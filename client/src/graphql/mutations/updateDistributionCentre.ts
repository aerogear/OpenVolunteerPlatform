import gql from "graphql-tag"
import { DistributionCentreFragment } from "../fragments/DistributionCentre"

export const updateDistributionCentre = gql`
  mutation updateDistributionCentre($input: DistributionCentreInput!) {
  updateDistributionCentre(input: $input) {
      ...DistributionCentreFields
  }
}


  ${DistributionCentreFragment}
`

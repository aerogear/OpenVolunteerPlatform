import gql from "graphql-tag"
import { DistributionCentreFragment } from "../fragments/DistributionCentre"

export const updatedDistributionCentre = gql`
  subscription updatedDistributionCentre {
  updatedDistributionCentre {
      ...DistributionCentreFields
  }
} 

  ${DistributionCentreFragment}
`

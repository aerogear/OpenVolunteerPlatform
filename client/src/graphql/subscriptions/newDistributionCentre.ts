import gql from "graphql-tag"
import { DistributionCentreFragment } from "../fragments/DistributionCentre"

export const newDistributionCentre = gql`
  subscription newDistributionCentre {
  newDistributionCentre {
      ...DistributionCentreFields
  }
} 

  ${DistributionCentreFragment}
`

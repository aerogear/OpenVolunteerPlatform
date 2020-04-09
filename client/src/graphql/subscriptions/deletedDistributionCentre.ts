import gql from "graphql-tag"
import { DistributionCentreFragment } from "../fragments/DistributionCentre"

export const deletedDistributionCentre = gql`
  subscription deletedDistributionCentre {
  deletedDistributionCentre {
      ...DistributionCentreFields
  }
} 

  ${DistributionCentreFragment}
`

import gql from "graphql-tag"
import { DistributionCentreExpandedFragment } from "../fragments/DistributionCentreExpanded"

export const findAllDistributionCentres = gql`
  query findAllDistributionCentres($limit: Int, $offset: Int) {
    findAllDistributionCentres(limit: $limit, offset: $offset) {
      ...DistributionCentreExpandedFields
    }
  }

  ${DistributionCentreExpandedFragment}
`

import gql from "graphql-tag"
import { DistributionCentreExpandedFragment } from "../fragments/DistributionCentreExpanded"

export const findDistributionCentres = gql`
  query findDistributionCentres($fields: DistributionCentreInput!, $limit: Int, $offset: Int) {
    findDistributionCentres(fields: $fields, limit: $limit, offset: $offset) {
      ...DistributionCentreExpandedFields
    }
  }

  ${DistributionCentreExpandedFragment}
`

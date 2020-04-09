import gql from "graphql-tag"
import { RecieverExpandedFragment } from "../fragments/RecieverExpanded"

export const findRecievers = gql`
  query findRecievers($fields: RecieverInput!, $limit: Int, $offset: Int) {
    findRecievers(fields: $fields, limit: $limit, offset: $offset) {
      ...RecieverExpandedFields
    }
  }

  ${RecieverExpandedFragment}
`

import gql from "graphql-tag"
import { RecieverExpandedFragment } from "../fragments/RecieverExpanded"

export const findAllRecievers = gql`
  query findAllRecievers($limit: Int, $offset: Int) {
    findAllRecievers(limit: $limit, offset: $offset) {
      ...RecieverExpandedFields
    }
  }

  ${RecieverExpandedFragment}
`

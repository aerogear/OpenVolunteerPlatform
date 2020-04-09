import gql from "graphql-tag"

export const DistributionCentreExpandedFragment = gql`
  fragment DistributionCentreExpandedFields on DistributionCentre {
   id
   name
   address
   lat
   long
   stock {
      id
      amount
      version
   }   version

} 
`

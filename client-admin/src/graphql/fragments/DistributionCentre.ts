import gql from "graphql-tag"

export const DistributionCentreFragment = gql`
  fragment DistributionCentreFields on DistributionCentre {
   id
   name
   address
   lat
   long
   version

} 
`

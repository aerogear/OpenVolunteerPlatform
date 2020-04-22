import gql from "graphql-tag"

export const VolunteerActionFragment = gql`
  fragment VolunteerActionFields on VolunteerAction {
   id
   title
   description
   products
   status
   actionType
   version

} 
`

import gql from "graphql-tag"

export const VolunteerExpandedFragment = gql`
  fragment VolunteerExpandedFields on Volunteer {
   id
   firstName
   lastName
   email
   username
   actions {
      id
      title
      description
      products
      status
      actionType
      version
   }   version

} 
`

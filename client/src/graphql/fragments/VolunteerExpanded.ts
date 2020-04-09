import gql from "graphql-tag"

export const VolunteerExpandedFragment = gql`
  fragment VolunteerExpandedFields on Volunteer {
   id
   name
   actions {
      id
      title
      description
      status
      actionType
      version
   }   version

} 
`

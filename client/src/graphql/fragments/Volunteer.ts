import gql from "graphql-tag"

export const VolunteerFragment = gql`
  fragment VolunteerFields on Volunteer {
   id
   firstName
   lastName
   email
   username
   version

} 
`

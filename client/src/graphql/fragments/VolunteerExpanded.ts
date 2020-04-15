import gql from "graphql-tag"

export const VolunteerExpandedFragment = gql`
  fragment VolunteerExpandedFields on Volunteer {
   id
   firstName
   lastName
   email
   username
   address1
   address2
   city
   dateOfBirth
   canPhoneCall
   canDeliver
   actions {
      id
      title
      description
      products
      status
      actionType
   }
} 
`

import gql from "graphql-tag"

export const VolunteerActionExpandedFragment = gql`
  fragment VolunteerActionExpandedFields on VolunteerAction {
   id
   title
   description
   products
   status
   actionType
   volunteer {
      id
      name
      version
   }
   reciever {
      id
      name
      phone
      address
      prefferedProducts
      version
   }   version

} 
`

import gql from "graphql-tag"

export const VolounteerActionExpandedFragment = gql`
  fragment VolounteerActionExpandedFields on VolounteerAction {
   id
   title
   description
   products
   status
   actionType
   volounteer {
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

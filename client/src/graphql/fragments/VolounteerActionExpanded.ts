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
      version
   }
   reciever {
      id
      name
      phone
      address
      prefferedProducts
      address1
      address2
      city
      dateOfBirth
      canPhoneCall
      canDeliver
      version
   }   version

} 
`

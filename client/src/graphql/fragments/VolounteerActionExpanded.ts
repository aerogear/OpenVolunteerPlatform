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

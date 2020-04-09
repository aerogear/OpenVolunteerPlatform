import gql from "graphql-tag"

export const ActionExpandedFragment = gql`
  fragment ActionExpandedFields on Action {
   id
   title
   description
   status
   actionType
   products {
      id
      name
      version
   }
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
      version
   }   version

} 
`

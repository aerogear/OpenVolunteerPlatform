import gql from "graphql-tag"

export const RecieverExpandedFragment = gql`
  fragment RecieverExpandedFields on Reciever {
   id
   name
   phone
   address
   prefferedProducts
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

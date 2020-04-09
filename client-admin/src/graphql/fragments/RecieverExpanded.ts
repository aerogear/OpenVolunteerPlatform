import gql from "graphql-tag"

export const RecieverExpandedFragment = gql`
  fragment RecieverExpandedFields on Reciever {
   id
   name
   phone
   address
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

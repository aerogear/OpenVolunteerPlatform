import gql from "graphql-tag"

export const RecieverFragment = gql`
  fragment RecieverFields on Reciever {
   id
   name
   phone
   address
   version

} 
`

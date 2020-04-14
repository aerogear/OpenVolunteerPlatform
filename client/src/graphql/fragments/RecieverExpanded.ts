import gql from "graphql-tag"

export const RecieverExpandedFragment = gql`
  fragment RecieverExpandedFields on Reciever {
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

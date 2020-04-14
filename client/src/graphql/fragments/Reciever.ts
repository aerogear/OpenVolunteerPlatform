import gql from "graphql-tag"

export const RecieverFragment = gql`
  fragment RecieverFields on Reciever {
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

} 
`

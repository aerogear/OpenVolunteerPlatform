import gql from "graphql-tag"

export const ProductExpandedFragment = gql`
  fragment ProductExpandedFields on Product {
   id
   name
   action {
      id
      title
      description
      status
      actionType
      version
   }   version

} 
`

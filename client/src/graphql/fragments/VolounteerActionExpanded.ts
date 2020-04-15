import gql from "graphql-tag"

export const VolounteerActionExpandedFragment = gql`
  fragment VolounteerActionExpandedFields on VolounteerAction {
   id
   title
   description
   products
   status
   actionType

} 
`

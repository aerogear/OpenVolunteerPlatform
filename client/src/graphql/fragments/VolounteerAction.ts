import gql from "graphql-tag"

export const VolounteerActionFragment = gql`
  fragment VolounteerActionFields on VolounteerAction {
   id
   title
   description
   products
   status
   actionType

} 
`

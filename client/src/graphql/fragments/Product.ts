import gql from "graphql-tag"

export const ProductFragment = gql`
  fragment ProductFields on Product {
   id
   name
   version

} 
`

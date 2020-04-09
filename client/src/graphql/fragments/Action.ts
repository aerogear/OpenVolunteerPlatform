import gql from "graphql-tag"

export const ActionFragment = gql`
  fragment ActionFields on Action {
   id
   title
   description
   status
   actionType
   version

} 
`

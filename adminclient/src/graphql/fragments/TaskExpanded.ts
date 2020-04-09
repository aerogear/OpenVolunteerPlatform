import gql from "graphql-tag"

export const TaskExpandedFragment = gql`
  fragment TaskExpandedFields on Task {
   id
   title
   description
   status
   version

} 
`

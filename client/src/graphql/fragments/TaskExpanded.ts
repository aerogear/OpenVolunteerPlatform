import gql from "graphql-tag"

export const TaskExpandedFragment = gql`
  fragment TaskExpandedField on Task {
   id
   title
   description
   status
   version

} 
`

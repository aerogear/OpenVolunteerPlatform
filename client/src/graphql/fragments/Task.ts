import gql from "graphql-tag"

export const TaskFragment = gql`
  fragment TaskFields on Task {
   id
   title
   description
   status
   version

} 
`

import gql from 'graphql-tag';

export const ADD_TASK = gql`
mutation createTask($description: String!, $title: String!, $status: TaskStatus){
    createTask(description: $description, title: $title, status: $status){
      id
      title
      description
      version
      status
    }
  }
`;

export const GET_TASKS = gql`
  query allTasks($first: Int) {
    allTasks(first: $first) {
      id
      title
      description
      version
      status
    }
}
`;

export const DELETE_TASK = gql`
mutation deleteTask($id: ID!){
  deleteTask(id: $id)
}
`;

export const UPDATE_TASK = gql`
mutation updateTask($description: String, $id: ID!, $title: String, $version: Int!, $status: TaskStatus) {
  updateTask(description: $description, id: $id, title: $title, version: $version, status: $status) {
    id
    title
    description
    version
    status
  }
}
`;

export const TASK_MUTATED_SUBSCRIPTION = gql`
  subscription tasks {
    tasks {
      action
      task {
        id
        title
        description
        version
        status
      }
    }
  }
`;

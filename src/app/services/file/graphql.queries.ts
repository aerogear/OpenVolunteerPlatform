import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;


export const UPLOADS = gql`
  query uploads{
    uploads{
      filename
      mimetype
      url
    }
  }
`;


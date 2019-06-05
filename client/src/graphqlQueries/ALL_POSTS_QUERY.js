import gql from 'graphql-tag';

export default gql`
{
     allPosts{
          id
          title
          owner
     }
}
`;

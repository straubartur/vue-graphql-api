import gql from 'graphql-tag';

export default gql`
{
     allList{
          id
          title
          owner
     }
}
`;

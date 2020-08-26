import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const PoolWhysFragment = graphql`
  fragment PoolWhysData on Query {
    pool {
      whyus {
        title
        description
        questions{
          title
          description
          id
          icon
        }
      }
    }
  }
`;

import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const PoolStackFragment = graphql`
  fragment PoolStackData on Query {
    pool {
      stack {
        title
        info{
          copy
          icon
          id
        }
      }
    }
  }
`;

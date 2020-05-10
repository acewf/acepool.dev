import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const PoolFaqsFragment = graphql`
  fragment PoolFaqsData on Query {
    pool {
      faqs {
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

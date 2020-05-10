import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const PoolMetaFragment = graphql`
  fragment PoolMetaData on Query {
    pool{
      metadata {
        siteName
        title
        description
        image {
          publicURL
        }
        ogTitle
        ogDescription
        ogType
        twitterCard
        twitterDescription
        author
        keywords
      }
    }
  }
`;

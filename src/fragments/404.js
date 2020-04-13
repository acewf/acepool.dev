import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const Page404Fragment = graphql`
  fragment Page404Data on Query {
    page404 {
      title
      text
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

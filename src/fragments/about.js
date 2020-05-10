import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const PoolAboutFragment = graphql`
  fragment PoolAboutData on Query {
    pool {
      about {
        heading
        description
        jackpot
        img{
          childImageSharp{
            fluid{
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

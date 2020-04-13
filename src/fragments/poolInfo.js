import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const PoolInfoFragment = graphql`
  fragment PoolInfoData on Query {
    pool {
      wallets
      logo{
        childImageSharp{
          fluid{
            ...GatsbyImageSharpFluid
          }
        }
      }
      info {
        title
        description
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

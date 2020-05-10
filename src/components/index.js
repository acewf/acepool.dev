import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const SEO = ({
  title,
  siteName,
  description,
  ogTitle,
  ogDescription,
  ogType,
  ogImage,
  ogUrl,
  ogLocale,
  ogVideo,
  twitterCard,
  twitterDescription,
  twitterCreator,
  twitterImage,
  twitterImageAlt,
  lang,
  meta,
  keywords
}) => (
  <Helmet
    htmlAttributes={{
      lang
    }}
    title={title}
    titleTemplate={`${title}`}
    meta={[
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: ogTitle
      },
      {
        property: 'og:description',
        content: ogDescription
      },
      {
        property: 'og:type',
        content: ogType
      },
      {
        property: 'og:image',
        content: ogImage
      },
      {
        property: 'og:url',
        content: ogUrl
      },
      {
        property: 'og:locale',
        content: ogLocale
      },
      {
        property: 'og:site_name',
        content: siteName
      },
      {
        property: 'og:video',
        content: ogVideo
      },
      {
        name: 'twitter:site',
        content: siteName
      },
      {
        name: 'twitter:card',
        content: twitterCard
      },
      {
        name: 'twitter:image',
        content: twitterImage
      },
      {
        name: 'twitter:image:alt',
        content: twitterImageAlt
      },
      {
        name: 'twitter:creator',
        content: twitterCreator
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: twitterDescription
      }
    ]
      .concat(
        keywords.length > 0
          ? {
            name: 'keywords',
            content: keywords.join(', ')
          }
          : []
      )
      .concat(meta)}
  />
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  siteName: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  ogLocale: PropTypes.string,
  ogVideo: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterCreator: PropTypes.string,
  twitterImage: PropTypes.string,
  twitterImageAlt: PropTypes.string
};

SEO.defaultProps = {
  description: '',
  siteName: '',
  lang: 'en',
  meta: [],
  keywords: [],
  ogTitle: '',
  ogDescription: '',
  ogType: 'website',
  ogImage: null,
  ogLocale: 'en_GB',
  ogUrl: null,
  ogVideo: null,
  twitterCard: '',
  twitterDescription: '',
  twitterCreator: '@Outriders',
  twitterImage: null,
  twitterImageAlt: 'OUTRIDERS Game characters walking'
};

export default SEO;

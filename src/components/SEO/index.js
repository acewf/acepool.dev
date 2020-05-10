import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const listOfMetaProperties = [
  { name: 'description', key: 'description' },
  { property: 'og:title', key: 'ogTitle' },
  { property: 'og:description', key: 'ogDescription' },
  { property: 'og:type', key: 'ogType' },
  { property: 'og:image', key: 'ogImage' },
  { property: 'og:url', key: 'ogUrl' },
  { property: 'og:locale', key: 'ogLocale' },
  { property: 'og:site_name', key: 'siteName' },
  { property: 'og:video', key: 'ogVideo' },
  { name: 'twitter:site', key: 'siteName' },
  { name: 'twitter:card', key: 'twitterCard' },
  { name: 'twitter:image', key: 'image' },
  { name: 'twitter:image:alt', key: 'twitterImageAlt' },
  { name: 'twitter:creator', key: 'twitterCreator' },
  { name: 'twitter:title', key: 'title' },
  { name: 'twitter:description', key: 'twitterDescription' }
];

const getFullImageAddress = (url) => `https://acepool.dev${url}`;

const getMetadata = (data) => listOfMetaProperties.map((item) => ({
  ...item,
  content: (item.key === 'image')
    ? getFullImageAddress(data[item.key].publicURL) : data[item.key]
}));

const SEO = ({ data }) => {
  const { title, lang } = data;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`${title}`}
      meta={getMetadata(data)}
    />
  );
};

SEO.propTypes = {
  data: PropTypes.shape({
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
  })
};

SEO.defaultProps = {
  data: {
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
    ogUrl: 'https://acepool.dev/',
    ogVideo: null,
    twitterCard: '',
    twitterDescription: '',
    twitterCreator: '@aceStakePool',
    twitterImage: null,
    twitterImageAlt: 'Ace Pool'
  }
};

export default SEO;

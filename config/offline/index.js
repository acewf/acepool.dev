const runtimeCaching = [
  {
    // Match any same-origin request that contains 'api'.
    urlPattern: /(\.js$|\.css$)/,
    handler: 'cacheFirst',
    options: {
      cacheName: 'my-page-cache',
      expiration: {
        maxEntries: 15,
        maxAgeSeconds: 60 * 60
      },
      cacheableResponse: {
        statuses: [0, 200]
      },
      // matchOptions and fetchOptions are used to configure the handler.
      matchOptions: {
        ignoreSearch: true
      }
    }
  }
];

module.exports = () => ({
  resolve: 'gatsby-plugin-offline',
  options: {
    importWorkboxFrom: 'local',
    globDirectory: 'public/',
    globPatterns: ['**/*.{js,png,jpg,jpeg,webp,svg,woff,woff2,json,html,css}'],
    globIgnores: [
      '**/workbox-v3.6.3/*.js*',
      '**/node_modules/**/*',
      '**/sw.js'
    ],
    runtimeCaching,
    offlineGoogleAnalytics: true,
    skipWaiting: true,
    clientsClaim: true
  }
});

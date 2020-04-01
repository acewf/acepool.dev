const path = require('path');

module.exports = (dirpath, folder) => ({
  resolve: 'gatsby-plugin-alias-imports',
  options: {
    alias: {
      '~': path.resolve(dirpath, folder)
    },
    extensions: ['js']
  }
});

const _ = require('lodash');

module.exports = () => ({
  resolve: 'gatsby-transformer-json',
  options: {
    typeName: (props) => {
      const { node } = props;

      return _.camelCase(`${node.name}`);
    }
  }
});

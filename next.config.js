const transpileModules = require('next-transpile-modules');

const withTM = transpileModules([
  'lit-ssr',
  'lit-html',
  'lit-element',
  'updating-element',
  'template-shadowroot',
  '@polymer/polymer',
]);
 
module.exports = withTM();

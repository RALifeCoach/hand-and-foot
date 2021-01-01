const reactAppRewireBuildDev = require('react-app-rewire-build-dev');

const options = {
    outputPath : "build",  /***** required *****/
  }

module.exports = function override(config, env) {
    return reactAppRewireBuildDev(config, env, options);
  }
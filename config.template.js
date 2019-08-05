// Copy this file and save it in the same directory as "config.js". Then, change the values below
// to specify the values unique to your development, testing, staging, and production environments.

module.exports = {
  errorEmailAddress: '',
  emailConfig: {
    email: null,
    smtpHosts: null
  },
  common: {
    assetsSubDirectory: 'static',
    productionSourceMap: false,

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  // Change this value during your deployment process to the appropriate target environment.
  env: '"development"',
  prod: {
    env: {
      HOST: 'www.myproductionurl.com',
      NODE_ENV: '"production"',
      PORT: 80,
      PORT_HTTPS: 443
    },
    urls: {
      api: '"https://www.myproductionurl.com/api"',
      web: '"https://www.myproductionurl.com"'
    }
  },
  staging: {
    env: {
      HOST: 'www.mystagingurl.com',
      NODE_ENV: '"production"',
      PORT: 80,
      PORT_HTTPS: 443
    },
    urls: {
      api: '"https://www.mystagingurl.com/api"',
      web: '"https://www.mystagingurl.com"'
    }
  },
  test: {
    env: {
      HOST: 'www.testurl.com',
      NODE_ENV: '"test"',
      PORT: 80,
      PORT_HTTPS: 443
    },
    urls: {
      api: '"https://www.testurl.com/api"',
      web: '"https://www.testurl.com"'
    }
  },
  dev: {
    env: {
      HOST: 'localhost',
      NODE_ENV: '"development"',
      PORT: 22974,
      PORT_HTTPS: 22975
    },
    urls: {
      api: '"https://localhost:22975/api"',
      web: '"https://localhost:22975"'
    }
  },
  unittest: {
    env: {
      NODE_ENV: '"testing"'
    }
  }
};

const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    env: {
      webpack: (config, options) => {
        config.devtool = isProd ? config.devtool : 'eval-source-map';
        return config;
      },
      
    },
  }
  
  

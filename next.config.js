const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    env: {
      webpack: (config, options) => {
        config.devtool = isProd ? config.devtool : 'eval-source-map';
        return config;
      },
      faunaDbAdminKey: 'fnAD1d55EtACAPq7lsNJKHFTdBFVR6ew6PZ6Esmm',
      faunaDbSecret: 'fnAD1eDZSxACEtTdveFm5qyxjg-yeEkpA1cMvN_7',
      faunaDbGraphQlEndpoint: 'https://graphql.fauna.com/graphql',
      checkoutSecret : 'Madrid*2019*',
      nameProject: "El Tío Caracoles",
      toHome: isProd ? 'https://eltiocaracoles.com/' : 'http://localhost:3000/',
      profileInfo: isProd ? 'https://eltiocaracoles.com/api/profile' : 'http://localhost:3000/api/profile',
    },
  }
  
  
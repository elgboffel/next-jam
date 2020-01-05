const algoliasearch = require('algoliasearch');

const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);

exports.algoliaClient = algoliaClient;
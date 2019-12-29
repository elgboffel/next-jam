const compose = require('next-compose-plugins');
const withSass = require("@zeit/next-sass");
const path = require('path');
const fs = require('fs');

const nextConfig = {  
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });

    config.resolve.alias['~'] = path.resolve(__dirname);

    return config;
  },
  exportTrailingSlash: true,
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    const SITE_MAP_PATH = `site/site-map.json`;
    
    try {
      const siteMap = loadData(`${SITE_MAP_PATH}`).siteMap;

      return siteMap.reduce((paths, page) => {      
        
        paths[`${page.url}`] = { page: `/${page.template}`, query: { path: `${page.url}`, id: `${page.id}` } };
        
        return paths;
      }, {});

    } catch (err) {
      console.error(err);
      return false;
    }
  }
};

const loadData = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (err) {
    console.error(err)
    return false;
  }
}

module.exports = compose ([
  [withSass, {
    cssModules: true,
    sassLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    }
  }]
], nextConfig);
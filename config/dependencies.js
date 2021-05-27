

// No need to build the DLL in production
if (process.env.NODE_ENV === 'production' || process.env.NO_DLL === 'true') {
  process.exit(0);
}

require('shelljs/global');

// eslint-disable-next-line no-undef
exec(
  'webpack --display-chunks --color --config config/webpack.config.dll.js  --hide-modules'
);

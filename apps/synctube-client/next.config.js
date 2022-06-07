// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'i.ytimg.com', 'yt3.ggpht.com'],
  },
};

module.exports = withNx(nextConfig);

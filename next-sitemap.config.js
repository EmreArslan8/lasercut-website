/** @type {import('next-sitemap').IConfig} */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.2dtocut.com', // sitenin gerçek URL'sini yaz
    generateRobotsTxt: true,
    alternateRefs: [
      {
        href: 'https://www.2dtocut.com/en',
        hreflang: 'en',
      },
      {
        href: 'https://www.2dtocut.com/tr',
        hreflang: 'tr',
      },
    ],
    generateIndexSitemap: false,
  };
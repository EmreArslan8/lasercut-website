/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.2dtocut.com",


  generateRobotsTxt: true,
  generateIndexSitemap: false,


  exclude: ["/admin", "/dashboard", "/settings"],

  alternateRefs: [
    { href: "https://www.2dtocut.com/", hreflang: "x-default" },
    { href: "https://www.2dtocut.com/en", hreflang: "en" },
    { href: "https://www.2dtocut.com/tr", hreflang: "tr" },
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};

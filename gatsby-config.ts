import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "openpokertools.com",
    siteUrl: "https://openpokertools.com",
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["YOUR_TRACKING_ID"],
        pluginConfig: { head: true },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo.png",
      },
    },
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        icon: true,
      },
    },
    "gatsby-plugin-cname",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
  ],
};

export default config;

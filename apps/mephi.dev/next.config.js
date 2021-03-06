// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
    ],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react"
  }
});

/**
 * @type {import("@nrwl/next/plugins/with-nx").WithNxOptions}
 **/
const nextConfig = withMDX({
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})

module.exports = withNx(nextConfig);

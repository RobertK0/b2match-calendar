/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:year",
        destination: "/:year/1",
        permanent: true,
      },
    ];
  },
};

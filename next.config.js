/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/2022/5",
        permanent: true,
      },
      {
        source: "/:year",
        destination: "/:year/1",
        permanent: true,
      },
    ];
  },
};

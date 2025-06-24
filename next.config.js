const nextConfig = {
  images: {
    domains: ["res-console.cloudinary.com", "res.cloudinary.com"], // Allow Cloudinary domains
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

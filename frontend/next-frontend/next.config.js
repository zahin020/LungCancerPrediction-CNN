module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5002/:path*', // Use the actual IP address of your backend
      },
    ];
  },
};


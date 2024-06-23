/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/home', permanent: true }];
  },
  images: {
    remotePatterns: [{ hostname: 'via.placeholder.com' }, { hostname: 'rawإrrhqbuqlxiqvuhbmc.supabase.co' }],
  },
  reactStrictMode: true,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'via.placeholder.com' }, { hostname: 'rawrrhqbuqlxiqvuhbmc.supabase.co' }],
  },
  reactStrictMode: true,
};

export default nextConfig;

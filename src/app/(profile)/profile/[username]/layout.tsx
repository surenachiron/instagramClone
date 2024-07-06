export async function generateMetadata({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username);
  return {
    title: username,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

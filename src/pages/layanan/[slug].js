// pages/layanan/[slug].js
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  // Return props here if needed
  return { props: { session } };
}

export default function LayananPage({ session }) {
  // Render the page content
  return (
    <div>
      <h1>Layanan Page</h1>
      <p>Welcome, {session.user.name}. Here is the content for the layanan page.</p>
      {/* Add additional content and components here */}
    </div>
  );
}

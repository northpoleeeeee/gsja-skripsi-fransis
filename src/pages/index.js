import Link from 'next/link';
import Image from 'next/image';
import { FaAnglesRight } from 'react-icons/fa6';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="text-6xl font-bold">
              <span
                style={{
                  background: 'linear-gradient(to right, #ee0097, #9ca3af, #ffa611, #21bcfd, #000000)',
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                }}
              >
                Yohanes
                <br />
                <span
                  style={{
                    background: 'linear-gradient(to right, #000000, #21bcfd, #ffa611, #9ca3af, #ee0097)',
                    WebkitTextFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  8 : 12
                </span>
              </span>
            </h1>
            <p className="my-4">
              Maka Yesus berkata pula kepada orang banyak, kata-Nya: "Akulah terang dunia; barangsiapa mengikut Aku, ia tidak akan berjalan dalam kegelapan, melainkan ia akan mempunyai terang hidup".
            </p>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://id.wikipedia.org/wiki/Gereja_Sidang-Sidang_Jemaat_Allah"
              className="btn btn-dark rounded-full font-semibold px-4 p-1 inline-flex items-center gap-2"
            >
              <span> About GSJA</span>
              <FaAnglesRight className="animate-pulse" />
            </Link>

            {/* Conditionally render based on session status */}
            {session && session.user.role === 'admin' && (
              <p className="mt-4">Welcome, Admin!</p>
            )}
            {session && session.user.role === 'user' && (
              <p className="mt-4">Welcome back, {session.user.name}!</p>
            )}
            {!session && (
              <p className="mt-4">Welcome, guest! Please <Link href="/api/auth/signin">sign in</Link> to access more features.</p>
            )}
          </div>
          <div className="col-md-6 text-center">
            <Image
              src="/images/family.png"
              alt="FAMILY"
              height={500}
              width={500}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
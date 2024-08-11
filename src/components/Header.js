import { useSession, signIn, signOut } from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSignOutAlt, FaSignInAlt, FaVolumeUp } from 'react-icons/fa';
import Image from 'next/image';

// Fungsi untuk melakukan text-to-speech
const handleTextToSpeech = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Menentukan bahasa jika diperlukan
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name.includes('Google')) || null;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-Speech tidak didukung di browser Anda.');
  }
};

// Fungsi untuk menghentikan text-to-speech
const stopTextToSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">GSJA Mertiguna Sintang</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '1000px' }} navbarScroll>
              <Nav.Link
                href="/"
                onMouseEnter={() => handleTextToSpeech('Home')}
                onMouseLeave={() => stopTextToSpeech()}
              >
                Home
                <FaVolumeUp className="ms-2" />
              </Nav.Link>
              <Nav.Link
                href="/renungan"
                onMouseEnter={() => handleTextToSpeech('Renungan')}
                onMouseLeave={() => stopTextToSpeech()}
              >
                Renungan
                <FaVolumeUp className="ms-2" />
              </Nav.Link>
              <Nav.Link
                href="/jadwal"
                onMouseEnter={() => handleTextToSpeech('Jadwal Pelayanan')}
                onMouseLeave={() => stopTextToSpeech()}
              >
                Jadwal Pelayanan
                <FaVolumeUp className="ms-2" />
              </Nav.Link>
              <Nav.Link
                href="/about"
                onMouseEnter={() => handleTextToSpeech('Tentang Kami')}
                onMouseLeave={() => stopTextToSpeech()}
              >
                Tentang Kami
                <FaVolumeUp className="ms-2" />
              </Nav.Link>
              {!session?.user?.role === 'admin' && ( // Check if user is not admin
                <>
                  <NavDropdown 
                    title={<><span>Layanan</span> <FaVolumeUp className="ms-2" /></>}
                    id="nav-dropdown"
                    onMouseEnter={() => handleTextToSpeech('Layanan')}
                    onMouseLeave={() => stopTextToSpeech()}
                  >
                    <NavDropdown.Item 
                      href="/layanan/jemaat_baru"
                      onMouseEnter={() => handleTextToSpeech('Jemaat Baru')}
                      onMouseLeave={() => stopTextToSpeech()}
                    >
                      Jemaat Baru
                      <FaVolumeUp className="ms-2" />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/baptis"
                      onMouseEnter={() => handleTextToSpeech('Pembaptisan')}
                      onMouseLeave={() => stopTextToSpeech()}
                    >
                      Pembaptisan
                      <FaVolumeUp className="ms-2" />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/pernikahan"
                      onMouseEnter={() => handleTextToSpeech('Pernikahan')}
                      onMouseLeave={() => stopTextToSpeech()}
                    >
                      Pernikahan
                      <FaVolumeUp className="ms-2" />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/kematian"
                      onMouseEnter={() => handleTextToSpeech('Kematian')}
                      onMouseLeave={() => stopTextToSpeech()}
                    >
                      Kematian
                      <FaVolumeUp className="ms-2" />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/persembahan"
                      onMouseEnter={() => handleTextToSpeech('Persembahan')}
                      onMouseLeave={() => stopTextToSpeech()}
                    >
                      Persembahan
                      <FaVolumeUp className="ms-2" />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    href="/download"
                    onMouseEnter={() => handleTextToSpeech('Download Area')}
                    onMouseLeave={() => stopTextToSpeech()}
                  >
                    Download
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Form className="d-flex me-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onMouseEnter={() => handleTextToSpeech('Search')}
                onMouseLeave={() => stopTextToSpeech()}
              />
              <Button
                style={{ padding: '5px', margin: '5px' }}
                variant="outline-primary"
                onMouseEnter={() => handleTextToSpeech('Search')}
                onMouseLeave={() => stopTextToSpeech()}
              >
                Search
              </Button>
            </Form>
            <Nav className="ms-auto">
              <NavDropdown title="Account" id="NavbarScrollingDropdown">
                {session ? (
                  <>
                    <NavDropdown.Item href="/profile">
                      <Image
                        src={session.user.image || '/default-profile.png'}
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-circle"
                      />
                      <span className="ms-2">{session.user.name}</span>
                    </NavDropdown.Item>
                    {session.user.role === 'admin' && (
                      <NavDropdown.Item href="/admin">
                        Dashboard
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item onClick={() => signIn('google')}>
                    <FaSignInAlt className="me-2" /> Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

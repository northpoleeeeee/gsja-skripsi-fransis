import Link from 'next/link';

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-20 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">GSJA Mertiguna Sintang</h1>
        <p className="text-lg mb-4">
          GSJA Mertiguna Sintang adalah bagian dari Gereja Sidang-Sidang Jemaat Allah (GSJA) yang berkomitmen untuk melayani masyarakat dengan kasih dan dedikasi. Kami berfokus pada pertumbuhan rohani, pelayanan sosial, dan pengajaran Alkitab.
        </p>
        <p className="text-lg mb-4">
          Dengan berbagai program ibadah, pelayanan, dan kegiatan komunitas, kami bertujuan untuk menjadi berkat bagi setiap anggota dan masyarakat sekitar. Kami mengundang Anda untuk bergabung dengan kami dalam pelayanan dan komunitas kami.
        </p>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="bg-blue-500 text-white rounded-full font-semibold px-4 py-2 inline-flex items-center gap-2"
          >
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}

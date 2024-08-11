import { useState, useEffect } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { FaPrint, FaTrash } from 'react-icons/fa';

const JemaatPage = () => {
  const [jemaatData, setJemaatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Jumlah item per halaman

  useEffect(() => {
    const fetchJemaatData = async () => {
      try {
        const response = await fetch('/api/jemaat');
        const data = await response.json();
        setJemaatData(data);
      } catch (error) {
        console.error('Failed to fetch jemaat data:', error);
      }
    };

    fetchJemaatData();
  }, []);

  // Menghitung indeks data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jemaatData.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(jemaatData.length / itemsPerPage);

  const handlePrint = (jemaatId) => {
    console.log('Print action for jemaat id:', jemaatId);
  };

  const handleDelete = (jemaatId) => {
    console.log('Delete action for jemaat id:', jemaatId);
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="main-content flex-1 overflow-y-auto p-6">
          <h1 className="text-4xl font-bold mb-6">Data Jemaat</h1>
          <div className="table-container">
            <table className="table min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Lahir</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No HP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((jemaat) => (
                  <tr key={jemaat.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.birthPlace}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.birthDate ? new Date(jemaat.birthDate).toLocaleDateString('id-ID') : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button onClick={() => handlePrint(jemaat.id)} className="text-blue-500 hover:text-blue-700">
                        <FaPrint />
                      </button>
                      <button onClick={() => handleDelete(jemaat.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="pagination mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="text-gray-500 hover:text-gray-700"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="text-gray-500 hover:text-gray-700"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JemaatPage;

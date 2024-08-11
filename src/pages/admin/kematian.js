import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect, useState } from 'react';
import { FaTrash, FaPrint } from 'react-icons/fa';
import styles from './kematian.module.css'; // Import CSS module

export default function TabelKematian() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/kematian');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Handle delete action here
    console.log('Delete item with id:', id);
  };

  const handlePrint = () => {
    window.print(); // Trigger print dialog
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className={styles.container}>
        <h1 className="text-3xl font-bold mb-6">Tabel Kematian</h1>
        <table className={`${styles.table} min-w-full bg-white rounded-lg shadow-md`}>
          <thead>
            <tr>
              <th className={`${styles.th} py-2 px-4`}>Nama</th>
              <th className={`${styles.th} py-2 px-4`}>Tempat Lahir</th>
              <th className={`${styles.th} py-2 px-4`}>Tanggal Lahir</th>
              <th className={`${styles.th} py-2 px-4`}>Jenis Kelamin</th>
              <th className={`${styles.th} py-2 px-4`}>Hari Meninggal</th>
              <th className={`${styles.th} py-2 px-4`}>Tanggal Meninggal</th>
              <th className={`${styles.th} py-2 px-4`}>Tempat Meninggal</th>
              <th className={`${styles.th} py-2 px-4`}>Ditempatkan</th>
              <th className={`${styles.th} py-2 px-4`}>Alamat Rumah Duka</th>
              <th className={`${styles.th} py-2 px-4`}>Ibadah Tutup Peti</th>
              <th className={`${styles.th} py-2 px-4`}>Pemakaman</th>
              <th className={`${styles.th} py-2 px-4`}>Ibadah Penghiburan</th>
              <th className={`${styles.th} py-2 px-4`}>Pelapor</th>
              <th className={`${styles.th} py-2 px-4`}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className={`${styles.td} py-2 px-4`}>{item.name}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.birthPlace}</td>
                <td className={`${styles.td} py-2 px-4`}>{new Date(item.birthDate).toLocaleDateString()}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.gender}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.dayOfDeath}</td>
                <td className={`${styles.td} py-2 px-4`}>{new Date(item.dateOfDeath).toLocaleDateString()}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.placeOfDeath}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.isAtHomeOrFuneralHome === 'home' ? 'Rumah' : 'Rumah Duka'}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.funeralHomeAddress}</td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.ibadahTutupPeti_day}, {new Date(item.ibadahTutupPeti_date).toLocaleDateString()}, {item.ibadahTutupPeti_time}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.pemakaman_day}, {new Date(item.pemakaman_date).toLocaleDateString()}, {item.pemakaman_time}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.ibadahPenghiburan_day}, {new Date(item.ibadahPenghiburan_date).toLocaleDateString()}, {item.ibadahPenghiburan_time}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.reporter_name}, {item.reporter_address}, {item.reporter_phoneNumber}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  <div className={styles['action-buttons']}>
                    <button onClick={() => handleDelete(item.id)} className={styles['action-button']}>
                      <FaTrash />
                    </button>
                    <button onClick={handlePrint} className={styles['action-button']}>
                      <FaPrint />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

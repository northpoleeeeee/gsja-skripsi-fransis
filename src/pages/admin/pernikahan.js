import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPrint, FaTrash } from 'react-icons/fa'; // Import icons
import styles from './PernikahanTable.module.css';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';

export default function PernikahanTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pernikahan');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = (id) => {
    // Add print functionality here
    window.print(); // Simplified print functionality
  };

  const handleDelete = async (id) => {
    // Add delete functionality here
    try {
      const response = await fetch(`/api/pernikahan/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(data.filter(item => item._id !== id)); // Remove item from state
      } else {
        console.error('Failed to delete data');
      }
    } catch (error) {
      console.error('Failed to delete data', error);
    }
  };

  // Format date to only show YYYY-MM-DD
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('id-ID') : 'N/A';

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className={styles.container}>
        <h1 className="mb-4">Tabel Pernikahan</h1>
        <div className={styles.tableContainer}>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Pria</th>
                <th>Tempat Lahir Pria</th>
                <th>Tanggal Lahir Pria</th>
                <th>Alamat Pria</th>
                <th>Pekerjaan Pria</th>
                <th>Kewarganegaraan Pria</th>
                <th>No Telepon Pria</th>
                <th>Baptis Pria</th>
                <th>Tempat Baptis Pria</th>
                <th>Tanggal Baptis Pria</th>
                <th>Pendeta Baptis Pria</th>
                <th>Nama Wanita</th>
                <th>Tempat Lahir Wanita</th>
                <th>Tanggal Lahir Wanita</th>
                <th>Alamat Wanita</th>
                <th>Pekerjaan Wanita</th>
                <th>Kewarganegaraan Wanita</th>
                <th>No Telepon Wanita</th>
                <th>Baptis Wanita</th>
                <th>Tempat Baptis Wanita</th>
                <th>Tanggal Baptis Wanita</th>
                <th>Pendeta Baptis Wanita</th>
                <th>Nama Ayah Wanita</th>
                <th>Agama Ayah Wanita</th>
                <th>Nama Ibu Wanita</th>
                <th>Agama Ibu Wanita</th>
                <th>Konselor</th>
                <th>Tanggal Konseling</th>
                <th>Tanggal Pemberkatan</th>
                <th>Tempat Pemberkatan</th>
                <th>Pendeta Pemberkatan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.namePria}</td>
                  <td>{item.birthPlacePria}</td>
                  <td>{formatDate(item.birthDatePria)}</td>
                  <td>{item.addressPria}</td>
                  <td>{item.pekerjaanPria}</td>
                  <td>{item.kewarganegaraanPria}</td>
                  <td>{item.phoneNumberPria}</td>
                  <td>{item.baptisPria}</td>
                  <td>{item.tempatBaptisPria}</td>
                  <td>{formatDate(item.tanggalBaptisPria)}</td>
                  <td>{item.pendetaBaptisPria}</td>
                  <td>{item.nameWanita}</td>
                  <td>{item.birthPlaceWanita}</td>
                  <td>{formatDate(item.birthDateWanita)}</td>
                  <td>{item.addressWanita}</td>
                  <td>{item.pekerjaanWanita}</td>
                  <td>{item.kewarganegaraanWanita}</td>
                  <td>{item.phoneNumberWanita}</td>
                  <td>{item.baptisWanita}</td>
                  <td>{item.tempatBaptisWanita}</td>
                  <td>{formatDate(item.tanggalBaptisWanita)}</td>
                  <td>{item.pendetaBaptisWanita}</td>
                  <td>{item.fatherNameWanita}</td>
                  <td>{item.agamaAyahWanita}</td>
                  <td>{item.motherNameWanita}</td>
                  <td>{item.agamaIbuWanita}</td>
                  <td>{item.konselor}</td>
                  <td>{formatDate(item.tanggalKonseling)}</td>
                  <td>{formatDate(item.tanggalPemberkatan)}</td>
                  <td>{item.tempatPemberkatan}</td>
                  <td>{item.pendetaPemberkatan}</td>
                  <td>
                    <Button variant="info" onClick={() => handlePrint(item._id)} className="me-2">
                      <FaPrint />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

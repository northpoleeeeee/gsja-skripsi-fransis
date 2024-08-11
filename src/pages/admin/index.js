// pages/admin/index.js
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import styles from './AdminDashboard.module.css'; // Import CSS module

export default function AdminDashboard({ dataCounts }) {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className={styles.dashboardContainer}>
        <h1>Selamat Datang di Dashboard Admin :)</h1>
        <div className={`${styles.container} ${styles.blueBackground}`}>
          <p>Total Pengguna: {dataCounts?.users ?? 'Data tidak tersedia'}</p>
        </div>
        <div className={`${styles.container} ${styles.greenBackground}`}>
          <p>Total Jemaat: {dataCounts?.jemaat ?? 'Data tidak tersedia'}</p>
        </div>
        <div className={`${styles.container} ${styles.yellowBackground}`}>
          <p>Total Baptis: {dataCounts?.baptis ?? 'Data tidak tersedia'}</p>
        </div>
        <div className={`${styles.container} ${styles.pinkBackground}`}>
          <p>Total Pernikahan: {dataCounts?.pernikahan ?? 'Data tidak tersedia'}</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const { data: usersCount } = await axios.get(`${process.env.API_URL}/api/users/count`);
    const { data: jemaatCount } = await axios.get(`${process.env.API_URL}/api/jemaat/count`);
    const { data: baptisCount } = await axios.get(`${process.env.API_URL}/api/baptis/count`);
    const { data: pernikahanCount } = await axios.get(`${process.env.API_URL}/api/pernikahan/count`);

    return {
      props: {
        dataCounts: {
          users: usersCount.count,
          jemaat: jemaatCount.count,
          baptis: baptisCount.count,
          pernikahan: pernikahanCount.count,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching data counts:', error);
    return {
      props: {
        dataCounts: {},
      },
    };
  }
}

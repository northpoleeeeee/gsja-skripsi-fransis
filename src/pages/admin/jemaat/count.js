import { connectToDatabase } from '../../lib/db'; // Sesuaikan dengan lokasi `connectToDatabase`

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let connection;
    try {
      connection = await connectToDatabase();
      const [rows] = await connection.query('SELECT COUNT(*) AS count FROM jemaat');
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching jemaat count:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil jumlah jemaat.' });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

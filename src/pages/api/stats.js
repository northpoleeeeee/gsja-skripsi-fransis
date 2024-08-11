// pages/api/stats.js
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let connection;
    try {
      connection = await connectToDatabase();
      
      const [jemaatCount] = await connection.query('SELECT COUNT(*) AS count FROM jemaat');
      const [baptisCount] = await connection.query('SELECT COUNT(*) AS count FROM baptis');
      const [pernikahanCount] = await connection.query('SELECT COUNT(*) AS count FROM pernikahan');
      const [kematianCount] = await connection.query('SELECT COUNT(*) AS count FROM kematian');
      const [persembahanCount] = await connection.query('SELECT COUNT(*) AS count FROM persembahan');
      const [documentCount] = await connection.query('SELECT COUNT(*) AS count FROM document');

      res.status(200).json({
        jemaat: jemaatCount[0].count,
        baptis: baptisCount[0].count,
        pernikahan: pernikahanCount[0].count,
        kematian: kematianCount[0].count,
        persembahan: persembahanCount[0].count,
        document: documentCount[0].count,
      });
    } catch (error) {
      console.error('Error fetching data counts:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data jumlah.' });
    } finally {
      // Ensure the connection is released
      if (connection) {
        await connection.end();
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

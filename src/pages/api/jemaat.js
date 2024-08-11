// pages/api/jemaat.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Buat koneksi ke database
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gsja-fransis',
      });

      // Ambil data dari tabel jemaat
      const [rows] = await connection.execute('SELECT * FROM jemaat');
      res.status(200).json(rows);

      await connection.end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jemaat data' });
    }
  } else if (req.method === 'POST') {
    const { name, birthPlace, birthDate, address, phoneNumber, originalChurch, isNewMember } = req.body;

    try {
      // Buat koneksi ke database
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gsja-fransis',
      });

      // Insert data ke dalam tabel jemaat
      const query = `INSERT INTO jemaat (name, birthPlace, birthDate, address, phoneNumber, originalChurch, isNewMember) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await connection.execute(query, [name, birthPlace, birthDate, address, phoneNumber, originalChurch, isNewMember]);

      res.status(200).json({ message: 'Data berhasil disimpan!' });
      await connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

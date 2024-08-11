// pages/admin/users/edit/[id].js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './EditUser.module.css'; // Import CSS module

export default function EditUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, name, image, role } = event.target.elements;

    // Validasi data
    if (!email.value || !name.value || !role.value) {
      setError('Email, name, and role are required');
      return;
    }

    try {
      await axios.put(`/api/users/${id}`, {
        email: email.value,
        name: name.value,
        image: image.value,
        role: role.value,
      });
      router.push('/admin/users');
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Error updating user data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            required
            className={styles.input}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            required
            className={styles.input}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            defaultValue={user.image}
            className={styles.input}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            defaultValue={user.role}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Update</button>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './EditUser.module.css'; // Impor CSS module jika diperlukan

export default function EditUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan loading state
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
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

    try {
      await axios.put(`/api/users/${id}`, {
        email: email.value,
        name: name.value,
        image: image.value,
        role: role.value,
      });
      router.push('/admin/users');
    } catch (error) {
      setError('Error updating user data');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" defaultValue={user.email} required />
        </label>
        <label>
          Name:
          <input type="text" name="name" defaultValue={user.name} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" defaultValue={user.image} />
        </label>
        <label>
          Role:
          <input type="text" name="role" defaultValue={user.role} required />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

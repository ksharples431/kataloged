import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/auth/auth-thunks';

import Button from '@/components/UI/Button';

import styles from './Login.module.css';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      alert('Passwords do not match');
      return;
    }

    dispatch(login(formData));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit">Login</Button>
    </form>
  );
}

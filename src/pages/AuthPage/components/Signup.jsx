import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '@/store/auth/auth-thunks';

import Button from '@/components/UI/Button';

import styles from './Signup.module.css';

export default function SignupForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
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

    dispatch(signup(formData));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

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

      <div className={styles.formGroup}>
        <label htmlFor="verifyPassword">Verify Password</label>
        <input
          type="password"
          id="verifyPassword"
          name="verifyPassword"
          value={formData.verifyPassword}
          onChange={handleChange}
          required
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit">Sign Up</Button>
    </form>
  );
}

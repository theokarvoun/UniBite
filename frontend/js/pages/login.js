import { login } from '../api/accounts.js';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  await login(formData.email, formData.password); // accounts.js handles saving & redirect
});
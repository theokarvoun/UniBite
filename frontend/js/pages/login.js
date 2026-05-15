import { login } from '../api/accounts.js';

document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            // Mock login - in production, use fetch API to authenticate
            console.log('Login attempt:', formData);
            login(formData.email, formData.password);
            
            
        });
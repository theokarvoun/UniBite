document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: 'student' // For demo purposes, default to student role. In production, determine role based on authentication response.
            };

            // Mock login - in production, use fetch API to authenticate
            console.log('Login attempt:', formData);
            
            // Redirect based on role
            if (formData.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = '../../pages/student-dashboard.html';
                Console.log('Student login successful');
            }
        });
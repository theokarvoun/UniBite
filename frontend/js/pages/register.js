const passwordInput = document.getElementById('password');
        const strengthBar = document.getElementById('strengthBar');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const submitBtn = document.getElementById('submitBtn');

        // Password strength checker
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;

            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;

            strengthBar.className = 'password-strength-bar';
            
            if (strength >= 3) {
                strengthBar.classList.add('strength-strong');
            } else if (strength >= 2) {
                strengthBar.classList.add('strength-medium');
            } else if (strength >= 1) {
                strengthBar.classList.add('strength-weak');
            }
        });

        // Form validation
        document.getElementById('registerForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                alert('Οι κωδικοί δεν ταιριάζουν!');
                return;
            }

            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                password: password
            };

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Δημιουργία...';

            try {
                const res = await fetch('http://localhost:5000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!res.ok) {
                    const error = await res.json();
                    alert(error.error || 'Registration failed!');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Δημιουργία Λογαριασμού';
                    return;
                }

                const user = await res.json();
                alert('Ο λογαριασμός σου δημιουργήθηκε επιτυχώς! Καλώς ήρθες στο UniBite! 🎉');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Registration error:', error);
                alert('Connection error. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Δημιουργία Λογαριασμού';
            }
        });
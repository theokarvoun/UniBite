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
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                alert('Οι κωδικοί δεν ταιριάζουν!');
                return;
            }

            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: password,
                dormitory: document.getElementById('dormitory').value,
                initialCredits: 5
            };

            // Mock registration - in production, use fetch API
            console.log('Registration data:', formData);

            // Simulate API call
            submitBtn.disabled = true;
            submitBtn.textContent = 'Δημιουργία...';

            setTimeout(() => {
                alert('Ο λογαριασμός σου δημιουργήθηκε επιτυχώς! Καλώς ήρθες στο UniBite! 🎉');
                window.location.href = '../../pages/student-dashboard.html';
            }, 1500);
        });
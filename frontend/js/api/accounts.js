const LOGIN_URL = "http://localhost:5000/api/users/login";

export async function login(email, password) {
    try {
        const res = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json();
            alert(error.error || 'Login failed!');
            return;
        }

        const user = await res.json();
        // Store user info and redirect
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'student-feed.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Connection error. Please try again.');
    }
}


export async function getAccounts() {
    console.log("Fetching accounts...");
  const res = await fetch("../data/accounts.json");
  console.log("Response received:", res);
  return await res.json();
}

export async function login(email, password) {
    // Mock login - in production, use fetch API to authenticate
    console.log('Login attempt:', { email, password });
    const accounts = await getAccounts();
    if (accounts.some(acc => acc.email === email && acc.password === password && acc.role === 'student')) {
        window.location.href = '../../pages/student-dashboard.html';
    } else if (accounts.some(acc => acc.email === email && acc.password === password && acc.role === 'admin')) {
        window.location.href = '../../pages/admin-dashboard.html';
    } else {
        alert('Invalid credentials!');
    }
}

// Retrieve user data from localStorage
async function displayUserInfo() {
  const userInfo = document.getElementById('user-info');
  if (!userInfo) {
    setTimeout(displayUserInfo, 100);
    return;
  }

  // Still need the ID from localStorage to know who to fetch
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    userInfo.innerHTML = '<span>Not logged in</span>';
    return;
  }

  const { id } = JSON.parse(storedUser);

  try {
    // 👇 Fetch fresh data from DB every time
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();

    // Update localStorage to keep it in sync
    localStorage.setItem('user', JSON.stringify(user));

    userInfo.innerHTML = `
      <div class="user-display">
        <span class="user-name">${user.name}</span>
        <span class="user-points">⭐ ${user.points || 0}</span>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching user data:', error);
    userInfo.innerHTML = '<span>Error loading user info</span>';
  }
}

// Handle logout
function handleLogout() {
  const logoutBtn = document.querySelector('.logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('user');
      window.location.href = 'login.html';
    });
  }
}

// Initialize on page load or after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    displayUserInfo();
    handleLogout();
  });
} else {
  displayUserInfo();
  handleLogout();
}

// Retrieve user data from localStorage
function displayUserInfo() {
  const userInfo = document.getElementById('user-info');
  
  // If element doesn't exist yet (top-bar loading), retry
  if (!userInfo) {
    setTimeout(displayUserInfo, 100);
    return;
  }
  
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    userInfo.innerHTML = '<span>Not logged in</span>';
    return;
  }

  try {
    const user = JSON.parse(storedUser);
    userInfo.innerHTML = `
      <div class="user-display">
        <span class="user-name">${user.name}</span>
        <span class="user-points">⭐ ${user.points || 0}</span>
      </div>
    `;
  } catch (error) {
    console.error('Error parsing user data:', error);
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

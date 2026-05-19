export function createPostCard(post) {
  const div = document.createElement("div");
  div.className = "post-card";
  div.dataset.postId = post.id; // 👈 needed to identify the post on click

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    if (/^\d{1,2}:\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    if (!isNaN(d)) {
      return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return dateStr;
  }

  let imageUrl = '';
  if (post.image) {
    if (post.image.startsWith('http')) {
      imageUrl = post.image;
    } else if (post.image.startsWith('/')) {
      imageUrl = `http://localhost:5000${post.image}`;
    } else {
      imageUrl = `http://localhost:5000/uploads/${post.image}`;
    }
  }

  const allergiesHtml = (post.allergies && post.allergies.length)
    ? `<p class="allergens">⚠️ <strong>Allergens:</strong> ${post.allergies.map(a => escapeHtml(a)).join(', ')}</p>`
    : '';

  div.innerHTML = `
    <div class="post-header">
      <h3>${post.title}</h3>
      <span class="status ${post.status}">
        ${post.status === "available" ? "Available" : "Sold Out"}
      </span>
    </div>
    ${imageUrl ? `<img src="${imageUrl}" alt="${escapeHtml(post.title)}" class="post-image">` : ''}
    <p class="post-description">${post.description}</p>
    <div class="post-info">
      <span class="portions-count">🍽 ${post.portions}</span>
      <span>📍 ${post.location}</span>
      <span>⏰ ${formatDate(post.time)}</span>
    </div>
    ${allergiesHtml}
    <button class="request-btn" ${post.portions === 0 ? "disabled" : ""}>
      ${post.portions === 0 ? "Sold Out" : "Request"}
    </button>
  `;

  // ✅ Attach the click handler HERE, after innerHTML is set
  const btn = div.querySelector('.request-btn');
  btn.addEventListener('click', async () => {
  btn.disabled = true;
  btn.textContent = 'Requesting...';

  const user = JSON.parse(localStorage.getItem('user')); // 👈 get logged in user
  const studentId = user?.id;

  if (!studentId) {
    alert('You must be logged in to request an advert.');
    btn.disabled = false;
    btn.textContent = 'Request';
    return;
  }

  try {
    // Send the request to the backend with both postId and studentId
    const response = await fetch('http://localhost:5000/api/adverts/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post.id, studentId }) // 👈 both sent
    });

    // Check if the response is OK
    const data = await response.json();
    div.querySelector('.portions-count').textContent = `🍽 ${data.post.portions}`;

    // Update user points in localStorage and re-render top bar
    const user = JSON.parse(localStorage.getItem('user'));
    user.points = data.studentPoints; // updated points from backend
    localStorage.setItem('user', JSON.stringify(user));
    displayUserInfo(); // re-render the top bar

    // Update button state based on new portions count
    if (data.post.portions === 0) {
      btn.textContent = 'Sold Out';
      btn.disabled = true;
    } else {
      btn.textContent = 'Requested ✓';
    }

  } catch (err) {
      console.error(err);
      btn.disabled = false;
      btn.textContent = 'Request';
      alert('Something went wrong, please try again.');
    }
});

  return div;
}
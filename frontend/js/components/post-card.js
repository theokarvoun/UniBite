export function createPostCard(post) {
  const div = document.createElement("div");
  div.className = "post-card";
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
    // Keep simple time strings as-is (HH:MM)
    if (/^\d{1,2}:\d{2}$/.test(dateStr)) return dateStr;
    // Try parsing ISO or YYYY-MM-DD
    const d = new Date(dateStr);
    if (!isNaN(d)) {
      return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return dateStr;
  }

  // Construct proper image URL pointing to backend server
  let imageUrl = '';
  if (post.image) {
    if (post.image.startsWith('http')) {
      imageUrl = post.image; // Already a full URL
    } else if (post.image.startsWith('/')) {
      imageUrl = `http://localhost:5000${post.image}`; // Prepend backend URL
    } else {
      imageUrl = `http://localhost:5000/uploads/${post.image}`; // Just filename, add full path
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
      <span>🍽 ${post.portions}</span>
      <span>📍 ${post.location}</span>
      <span>⏰ ${formatDate(post.time)}</span>
    </div>
    
    ${allergiesHtml}

    <button class="request-btn" ${post.portions === 0 ? "disabled" : ""}>
      Request
    </button>
  `;

  return div;
}
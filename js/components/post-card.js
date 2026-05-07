export function createPostCard(post) {
  const div = document.createElement("div");
  div.className = "post-card";

  div.innerHTML = `
    <div class="post-header">
      <h3>${post.title}</h3>
      <span class="status ${post.status}">
        ${post.status === "available" ? "Available" : "Sold Out"}
      </span>
    </div>

    <p>${post.description}</p>

    <div class="post-info">
      <span>🍽 ${post.portions}</span>
      <span>📍 ${post.location}</span>
      <span>⏰ ${post.time}</span>
    </div>

    <div class="allergens">
      ${post.allergens.map(a => `<span>${a}</span>`).join("")}
    </div>

    <button class="request-btn" ${post.portions === 0 ? "disabled" : ""}>
      Request
    </button>
  `;

  return div;
}
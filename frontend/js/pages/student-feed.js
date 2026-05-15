import { getPosts } from "../../js/api/posts.js";
import { createPostCard } from "../../js/components/post-card.js";

const container = document.getElementById("postsContainer");
const allergyCheckboxes = document.querySelectorAll(".checkbox-group input[type=checkbox]");
let allPosts = [];

function getSelectedAllergies() {
  return Array.from(allergyCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value.trim().toLowerCase());
}

function filterPosts(posts) {
  const selectedAllergens = getSelectedAllergies();
  if (!selectedAllergens.length) return posts;

  return posts.filter(post => {
    const postAllergens = new Set(
      Array.isArray(post.allergies)
        ? post.allergies.map(a => a.trim().toLowerCase())
        : []
    );

    return !selectedAllergens.some(allergen => postAllergens.has(allergen));
  });
}

function renderFeed(posts) {
  container.innerHTML = "";

  if (!posts.length) {
    container.innerHTML = "<p class='empty-feed'>No meals match the selected allergen filters.</p>";
    return;
  }

  posts.forEach(post => {
    const card = createPostCard(post);
    container.appendChild(card);
  });
}

function handleFilterChange() {
  const filtered = filterPosts(allPosts);
  renderFeed(filtered);
}

async function loadFeed() {
  allPosts = await getPosts();
  renderFeed(allPosts);
}

allergyCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", handleFilterChange);
});

loadFeed();
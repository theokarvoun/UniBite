import { getPosts } from "../../js/api/posts.js";
import { createPostCard } from "../../js/components/post-card.js";

const container = document.getElementById("postsContainer");

async function loadFeed() {
  const posts = await getPosts();

  container.innerHTML = ""; // clear old

  posts.forEach(post => {
    const card = createPostCard(post);
    container.appendChild(card);
  });
}

loadFeed();
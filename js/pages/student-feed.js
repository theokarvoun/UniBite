import { getPosts } from "../api/posts.js";
import { createPostCard } from "../components/postCard.js";

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
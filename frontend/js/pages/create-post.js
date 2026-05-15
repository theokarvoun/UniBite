import { createPost } from '../api.js';

const form = document.getElementById('createPostForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const allergensContainer = document.getElementById('allergensContainer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const allergies = Array.from(allergensContainer.querySelectorAll('input[type=checkbox]:checked'))
    .map(checkbox => checkbox.value);

  if (!title || !description) {
    alert('Please fill in all required fields.');
    return;
  }

  const postData = { title, description, allergies };

  const result = await createPost(postData);

  if (result) {
    alert('Post created successfully!');
    form.reset();
  } else {
    alert('Failed to create post. Please try again.');
  }
});
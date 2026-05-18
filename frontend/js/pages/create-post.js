import { createPost } from '../api/posts.js';

const form = document.getElementById('createPostForm');
const titleInput = document.getElementById('mealName');
const descriptionInput = document.getElementById('description');
const quantityInput = document.getElementById('quantity');
const locationInput = document.getElementById('location');
const timeInput = document.getElementById('time');
const imageInput = document.getElementById('image');
const allergensContainer = document.querySelector('.checkbox-group');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const portions = parseInt(quantityInput.value);
  const location = locationInput.value.trim();
  const time = timeInput.value;
  const image = imageInput.files[0];
  
  const allergies = Array.from(allergensContainer.querySelectorAll('input[type=checkbox]:checked'))
    .map(checkbox => checkbox.value);

  if (!title || !description || !portions) {
    alert('Please fill in all required fields.');
    return;
  }

  // Create FormData to handle both text and file data
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('portions', portions);
  formData.append('location', location);
  formData.append('time', time);
  
  if (image) {
    formData.append('image', image);
  }
  
  if (allergies.length > 0) {
    formData.append('allergies', JSON.stringify(allergies));
  }

  const result = await createPost(formData);

  if (result) {
    alert('Post created successfully!');
    //form.reset();
  } else {
    alert('Failed to create post. Please try again.');
  }
});
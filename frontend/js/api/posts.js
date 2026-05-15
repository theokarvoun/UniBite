const API_URL = "http://localhost:5000/api/posts";

export async function getPosts() {

  try {

    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return await res.json();

  } catch (error) {

    console.error(error);

    return [];
  }
}

export async function createPost(postData) {

  try {

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    });

    if (!res.ok) {
      throw new Error("Failed to create post");
    }

    return await res.json();

  } catch (error) {

    console.error(error);

    return null;
  }
}
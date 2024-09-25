import axios from "axios";

export const createOrUpdatePost = async (username, message, postId = null) => {
  const url = postId
    ? `https://lxozvcn98b.execute-api.eu-north-1.amazonaws.com/api/post/${postId}` // Uppdatera om postId finns
    : "https://lxozvcn98b.execute-api.eu-north-1.amazonaws.com/api/post"; // Skapa nytt inlägg om postId är null

  try {
    const response = await axios({
      method: postId ? "PUT" : "POST", // PUT för uppdatering, POST för nytt
      url: url,
      data: {
        username,
        message,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in createOrUpdatePost:", error.message);
    throw error; // Om du vill bubbla upp felet för hantering högre upp
  }
};

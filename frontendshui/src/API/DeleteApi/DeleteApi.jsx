import axios from "axios";

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `https://lxozvcn98b.execute-api.eu-north-1.amazonaws.com/api/post/${postId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error.message);
  }
};

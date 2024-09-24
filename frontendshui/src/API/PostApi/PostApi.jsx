import axios from "axios";

export const createOrUpdatePost = async (username, message) => {
  try {
    const response = await axios.post(
      "https://lxozvcn98b.execute-api.eu-north-1.amazonaws.com/api/post",
      {
        username,
        message,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

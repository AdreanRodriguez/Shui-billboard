import axios from "axios";

export const getAllMessages = async () => {
  try {
    const response = await axios.get(
      "https://lxozvcn98b.execute-api.eu-north-1.amazonaws.com/api/posts"
    );
    return response.data.data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const getUserMessages = async (username) => {
  try {
    const response = await axios.get(
      `https://lxozvcn98b.execute-api.eu-north-1.amazonaws.com/api/${username}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

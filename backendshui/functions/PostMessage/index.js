const { v4: uuid } = require("uuid");
const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");
const { allPosts } = require("../GetAllPosts/index.js");

exports.handler = async (event) => {
  try {
    const postId = uuid().substring(0, 5);
    const createdAt = new Date().toLocaleString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!event.body) {
      return sendError(400, `Your request body is empty. Please provide { username, message }`);
    }

    const { username, message } = JSON.parse(event.body);

    if (!username) {
      return sendError(400, "You need to type a username");
    }

    if (username.length < 3) {
      return sendError(400, "You need at least 3 characters for username");
    }

    if (!message) {
      return sendError(400, "You need to type a message");
    }

    if (message.length < 10) {
      return sendError(400, "You need to type at least 10 characters");
    }
    const addMessage = {
      postId: postId,
      createdAt: createdAt,
      username: username,
      message: message,
    };

    await db.put({
      TableName: "Shui-billboard-db",
      Item: addMessage,
    });

    return sendResponse(200, addMessage);
  } catch (error) {
    return sendError(400, { message: error.message });
  }
};

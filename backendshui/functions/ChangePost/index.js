const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) return sendError(404, "You need to insert postId");

    const postFound = await db.get({
      TableName: "Shui-billboard-db",
      Key: { postId: id },
    });

    if (!postFound.Item) return sendError(404, "Post not found, check id.");

    const { message } = JSON.parse(event.body);
    if (!message) return sendError(400, "No message changed, add message inside body");

    if (message.length < 10) return sendError(400, "You need to type at least 10 characters");

    const updatedAt = new Date().toLocaleString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const changedPost = await db.update({
      TableName: "Shui-billboard-db",
      Key: { postId: id },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "set message = :message, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
        ":message": message,
        ":updatedAt": updatedAt,
      },
    });
    return sendResponse(200, changedPost.Attributes);
  } catch (error) {
    sendError(404, error.message);
  }
};

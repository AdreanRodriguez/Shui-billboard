const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) return sendError(404, "You need to insert postId");

    const foundPost = await db.get({
      TableName: "Shui-billboard-db",
      Key: { postId: id },
    });

    if (!foundPost.Item) return sendError(404, "Post not found, check id");

    await db.delete({
      TableName: "Shui-billboard-db",
      Key: { postId: id },
    });

    return sendResponse(200, {
      message: "Post successfully deleted",
      deletedPost: foundPost.Item,
    });
  } catch (error) {
    return sendError(500, error.message);
  }
};

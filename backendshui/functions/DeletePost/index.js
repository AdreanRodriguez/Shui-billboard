const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return sendError(404, "No post with that id");
    }

    const getPostResponse = await db.get({
      TableName: "Shui-billboard-db",
      Key: { postId: id },
    });

    if (!getPostResponse.Item) {
      return sendError(404, "Post not found");
    }

    await db.delete({
      TableName: "Shui-billboard-db",
      Key: { postId: id },
    });

    return sendResponse(200, {
      message: "Post successfully deleted",
      deletedPost: getPostResponse.Item,
    });
  } catch (error) {
    return sendError(500, error.message);
  }
};

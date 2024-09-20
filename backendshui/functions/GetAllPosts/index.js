const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async () => {
  try {
    const { Items } = await db.scan({
      TableName: "Shui-billboard-db",
      FilterExpression: "attribute_exists(#DYNOBASE_postId)",
      ExpressionAttributeNames: { "#DYNOBASE_postId": "postId" },
    });
    if (Items.length < 1) {
      return sendError(404, "No post found");
    } else {
      return sendResponse(200, Items);
    }
  } catch (error) {
    return sendError(404, error.message);
  }
};

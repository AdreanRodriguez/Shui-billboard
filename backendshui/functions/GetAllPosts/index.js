const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async () => {
  try {
    const { Items } = await db.scan({
      TableName: "Shui-billboard-db",
      FilterExpression: "attribute_exists(#DYNOBASE_postId)",
      ExpressionAttributeNames: { "#DYNOBASE_postId": "postId" },
    });

    function sortItemsByDateAndTime(a, b) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // För att sortera nyast först.
    }

    if (Items.length < 1) return sendError(404, "No post found");

    Items.sort(sortItemsByDateAndTime);
    return sendResponse(200, Items);
  } catch (error) {
    return sendError(404, error.message);
  }
};

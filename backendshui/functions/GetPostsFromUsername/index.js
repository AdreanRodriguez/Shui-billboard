const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async (event) => {
  try {
    const { username } = event.pathParameters;

    if (!username) {
      return sendError(404, "Username parameter is missing");
    }

    const { Items } = await db.scan({
      TableName: "Shui-billboard-db",
      FilterExpression: "begins_with(#username, :username )",
      ExpressionAttributeNames: { "#username": "username" },
      ExpressionAttributeValues: { ":username": username },
    });

    if (!Items || Items.length < 1) return sendError(404, "No post found on this username");

    return sendResponse(200, { Items });
  } catch (error) {
    return sendError(error.message);
  }
};

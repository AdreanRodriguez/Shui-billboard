const { sendResponse, sendError } = require("../../responses/index.js");
const { db } = require("../../service/index.js");

exports.handler = async (event) => {
  return sendResponse(200, event);
};

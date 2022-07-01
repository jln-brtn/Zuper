import dotenv = require("dotenv");
import { router } from "../../../router";
import { RequestStore } from "../common";
import { Logger } from "../Logs/Logger";

module.exports.handle = async (event, context, callback) => {
  dotenv.config();
  RequestStore.getInstance(event, context, callback);
  Logger.create(process.env.log_level);

  Logger.debug(JSON.stringify(event));
  await router();
};

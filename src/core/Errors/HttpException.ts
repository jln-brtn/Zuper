import { RequestStore } from "../common";
import { Logger } from "../Logs/Logger";
import { HttpStatus } from "../Models/HttpStatus";

export class HttpException extends Error{
  constructor(message: string, httpStatus: HttpStatus) {
    super(message);
    const rs = RequestStore.getInstance();

    const response = {
      statusCode: httpStatus,
      body: message,
    };

    Logger.error(JSON.stringify(response));
    rs.callback(null, response);
  }
}

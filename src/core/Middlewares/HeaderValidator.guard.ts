import Joi = require("joi");
import { HttpException, HttpStatus, RequestStore } from "../common";
import { SuperMiddleware } from "./SuperMiddleware";

export class HeaderValidator extends SuperMiddleware {
  schema: Joi.Schema<any>;

  constructor(schema: Joi.Schema<any>) {
    super();
    this.schema = schema;
  }

  async process(): Promise<any> {
    return new Promise((resolve, reject) => {
      const rs = RequestStore.getInstance();

      const { error, value } = this.schema.validate(
        rs.event.queryStringParameters
      );

      if (error) {
        reject(
          new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST)
        );
      } else {
        resolve(true);
      }
    });
  }
}

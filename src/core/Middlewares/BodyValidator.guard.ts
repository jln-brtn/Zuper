import Joi = require("joi");
import { SuperMiddleware } from "./SuperMiddleware";

export class BodyValidator extends SuperMiddleware{

    constructor(schema: Joi.Schema<any>){
        super()
    }

    async process(): Promise<any> {
        return new Promise((resolve, reject) => {
            
        })
    }
}
import { override } from "joi";
import jose = require("jose");
import {
  HttpException,
  HttpStatus,
  RequestStore,
  SuperMiddleware,
} from "../common";

export class JWTAuthGuard extends SuperMiddleware {

  async process() {
    return new Promise(async (resolve, reject) => {
      const rs = RequestStore.getInstance();

      const publicKey = await jose.importSPKI(
        Buffer.from(process.env.public_key as any, "base64").toString("ascii"),
        "ES256"
      );

      try {
        const { payload } = await jose.jwtVerify(
          rs.event.headers["Authorization"].replace('Bearer ', ''),
          publicKey,
          {
            issuer: "urn:example:issuer",
            audience: "urn:example:audience",
          }
        );
        resolve(payload);
      } catch (error) {
        reject(
          new HttpException(
            "Erreur lors de l'authentification",
            HttpStatus.UNAUTHORIZED
          )
        );
      }
    });
  }
}

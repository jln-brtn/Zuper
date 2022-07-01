import { Router, Route, JWTAuthGuard, BodyValidator, HeaderValidator } from "./src/core/common";
import { loginSchema } from "./src/models/dto/login.schema";
import { login } from "./src/services/login.service";
import { TestService } from "./src/services/test.service";

export async function router() {
  await Router.create(
    new Route("GET", "/login", login).addMiddleware(
      new HeaderValidator(loginSchema)
    ),
    new Route("GET", "/test", TestService.test).addMiddleware(
      new JWTAuthGuard()
    )
  );
}

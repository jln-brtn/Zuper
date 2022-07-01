import { Logger } from "../Logs/Logger";
import { SuperMiddleware } from "../Middlewares/SuperMiddleware";
import { RequestStore } from "./RequestStore";

export class Router {
  static async create(...routes: Route[]) {
    const rs = RequestStore.getInstance();

    const event_path = rs.event.path;
    const event_method = rs.event.httpMethod;

    for (const route of routes) {
      if (event_method === route.httpMethod && event_path === route.path) {
        Logger.info(JSON.stringify(route));
        await route.execute();
        break;
      }
    }
  }
}

export class Route {
  httpMethod: any;
  path: any;
  func: any;
  middlewares: SuperMiddleware[];

  constructor(httpMethod, path, func) {
    Object.assign(this, { httpMethod, path, func });
    this.middlewares = [];
  }

  async execute() {
    for (const middleware of this.middlewares) {
      try {
        await middleware.process();
      } catch (error) {
        throw error;
      }
    }
    await this.func();
  }

  addMiddleware(middleware: SuperMiddleware) {
    this.middlewares.push(middleware);
    return this;
  }
}

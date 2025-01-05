import express, { Application } from "express";
import cors from "cors";
import { PORT, BASE_WEB_URL } from "./config";
import helmet from "helmet";
import AuthRoutes from "./routes/auth.routes";
import QuizRoutes from "./routes/quiz.routes";
import DataRoutes from "./routes/data.routes";

export default class Server {
  private app: Application;
  private port: number | string;

  constructor() {
    this.port = PORT || 8000;
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(
      cors({
        // origin: true,
        origin: [String(BASE_WEB_URL)],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      })
    );
    this.app.use(helmet());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/auth", new AuthRoutes().getRoutes());
    this.app.use("/quiz", new QuizRoutes().getRoutes());
    this.app.use("/data", new DataRoutes().getRoutes());
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}.`);
    });
  }
}

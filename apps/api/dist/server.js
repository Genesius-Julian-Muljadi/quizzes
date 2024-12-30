"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const data_routes_1 = __importDefault(require("./routes/data.routes"));
class Server {
    constructor() {
        this.port = config_1.PORT || 8000;
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: true,
            credentials: true,
        }));
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/auth", new auth_routes_1.default().getRoutes());
        this.app.use("/quiz", new quiz_routes_1.default().getRoutes());
        this.app.use("/data", new data_routes_1.default().getRoutes());
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}.`);
        });
    }
}
exports.default = Server;

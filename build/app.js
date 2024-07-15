"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// Swagger imports
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = require("./config/swagger");
const path_1 = __importDefault(require("path"));
// App initializations
exports.app = (0, express_1.default)();
//Swagger Settings
const specs = (0, swagger_jsdoc_1.default)(swagger_1.options);
// middlewares
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
exports.app.use(express_1.default.json({ limit: "50mb" }));
// root route
exports.app.get("/", (_req, res) => {
    res.send("Bienvenido al panel de medical dashboard");
});
// More App Routes
exports.app.use("/api", index_routes_1.default);
// Swagger routes
exports.app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
// Set App Port
exports.app.set("PORT", process.env.PORT || 3001);
// Swagger Settings
// Static Files
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "./upload")));

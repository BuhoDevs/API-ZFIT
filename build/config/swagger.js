"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Zfit Dashboard API",
            version: "1.0.0",
            description: "API de recursos para Dashboard ZFIT",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/auth/*.routes.ts"],
};

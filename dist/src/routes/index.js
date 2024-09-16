"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoute = void 0;
const mainRoute = async (app, _options) => {
    app.get("/", (req, res) => {
        res.status(200).send("Bem vindo ao Goals!");
    });
};
exports.mainRoute = mainRoute;

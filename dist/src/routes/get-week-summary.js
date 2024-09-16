"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryRoute = void 0;
const get_week_sumarry_1 = require("../features/get-week-sumarry");
const getSummaryRoute = async (app, _options) => {
    app.get("/summary", async (req, res) => {
        const { summary } = await (0, get_week_sumarry_1.getWeekSummary)();
        return { summary };
    });
};
exports.getSummaryRoute = getSummaryRoute;

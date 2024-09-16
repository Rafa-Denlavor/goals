"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingGoalRoute = void 0;
const get_week_pending_goals_1 = require("src/features/get-week-pending-goals");
const getPendingGoalRoute = async (app, _options) => {
    app.get("/pending-goals", async (req, res) => {
        const { pendingGoals } = await (0, get_week_pending_goals_1.getWeekPendingGoals)();
        return { pendingGoals };
    });
};
exports.getPendingGoalRoute = getPendingGoalRoute;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoalRoute = void 0;
const create_goal_1 = require("src/features/create-goal");
const zod_1 = require("zod");
const createGoalRoute = async (app, _options) => {
    app.post("/goals", {
        schema: {
            body: zod_1.z.object({
                title: zod_1.z.string(),
                description: zod_1.z.string().nullable().nullish(),
                desiredWeeklyFrequency: zod_1.z.number().int().min(1).max(7),
            }),
        },
    }, async (req, res) => {
        const { title, description, desiredWeeklyFrequency } = req.body;
        await (0, create_goal_1.createGoal)({
            title,
            description,
            desiredWeeklyFrequency,
        }).catch(() => {
            throw new Error("Unable to create goal");
        });
    });
};
exports.createGoalRoute = createGoalRoute;

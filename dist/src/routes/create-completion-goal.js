"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletionGoalRoute = void 0;
const create_gol_completion_1 = require("src/features/create-gol-completion");
const zod_1 = require("zod");
const createCompletionGoalRoute = async (app, _options) => {
    app.post("/completions", {
        schema: {
            body: zod_1.z.object({
                goalId: zod_1.z.string(),
            }),
        },
    }, async (req, res) => {
        const { goalId } = req.body;
        await (0, create_gol_completion_1.createGoalCompletion)(goalId);
        return { message: `Goal ${goalId} successfully updated!` };
    });
};
exports.createCompletionGoalRoute = createCompletionGoalRoute;

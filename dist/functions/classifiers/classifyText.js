"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$classifyText",
    aliases: ["$classifierClassify", "$classify"],
    description: "Classify a text sample using a named Bayes classifier.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The classifier name"),
        forgescript_1.Arg.requiredString("text", "Text to classify"),
        forgescript_1.Arg.optionalString("variable", "The variable to load the results to"),
    ],
    output: forgescript_1.ArgType.Json,
    execute(ctx, [name, text, variable]) {
        try {
            const result = structures_1.BayesClassifierManager.classify(name, text);
            if (!result) {
                return this.customError(`Classifier ${name} not found or not trained.`);
            }
            if (!variable)
                return this.successJSON(result);
            ctx.setEnvironmentKey(variable, result);
            return this.success();
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=classifyText.js.map
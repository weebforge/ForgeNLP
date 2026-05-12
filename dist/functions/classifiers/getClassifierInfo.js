"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$getClassifierInfo",
    aliases: ["$classifierInfo"],
    description: "Return metadata about a named Bayes classifier.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The classifier name"),
        forgescript_1.Arg.optionalString("variable", "The variable to load the results to"),
    ],
    output: forgescript_1.ArgType.Json,
    execute(ctx, [name, variable]) {
        try {
            const info = structures_1.BayesClassifierManager.getInfo(name);
            if (!info) {
                return this.customError(`Classifier ${name} not found.`);
            }
            if (!variable)
                return this.successJSON(info);
            ctx.setEnvironmentKey(variable, info);
            return this.success();
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=getClassifierInfo.js.map
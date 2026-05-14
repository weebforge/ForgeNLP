"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$getClassifierLabels",
    aliases: ["$classifierLabels"],
    description: "Get all labels/categories for a trained classifier.",
    version: "1.0.1",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The classifier name"),
        forgescript_1.Arg.optionalString("sep", "The separator to join the list"),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [name, sep]) {
        try {
            const labels = structures_1.BayesClassifierManager.getLabels(name);
            if (labels === null) {
                return this.customError(`Classifier ${name} not found or not trained.`);
            }
            return this.success(labels.join(sep ?? ", "));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=getClassifierLabels.js.map
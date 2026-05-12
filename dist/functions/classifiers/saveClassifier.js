"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$saveClassifier",
    aliases: ["$exportClassifier"],
    description: "Save a trained Bayes classifier to disk.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The classifier name"),
        forgescript_1.Arg.requiredString("path", "Output path for the classifier JSON file"),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [name, path]) {
        try {
            const saved = await structures_1.BayesClassifierManager.saveClassifier(name, path);
            if (!saved) {
                return this.customError(`Classifier ${name} not found or not trained.`);
            }
            return this.success();
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=saveClassifier.js.map
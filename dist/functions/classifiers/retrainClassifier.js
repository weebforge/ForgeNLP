"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$retrainClassifier",
    aliases: ["$classifierRetrain", "$trainClassifier"],
    description: "Retrain an existing Bayes classifier after adding documents.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The classifier name")],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [name]) {
        try {
            const retrained = structures_1.BayesClassifierManager.retrain(name);
            if (!retrained) {
                return this.customError(`Classifier ${name} not found.`);
            }
            return this.success(true);
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=retrainClassifier.js.map
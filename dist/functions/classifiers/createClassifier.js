"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$createClassifier",
    aliases: ["$newClassifier", "$makeClassifier"],
    description: "Create a named Bayes classifier instance.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The classifier name")],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [name]) {
        try {
            const created = structures_1.BayesClassifierManager.create(name);
            if (!created) {
                return this.customError(`Classifier ${name} already exists.`);
            }
            return this.success(true);
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=createClassifier.js.map
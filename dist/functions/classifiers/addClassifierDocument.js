"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$addClassifierDocument",
    aliases: ["$classifierAddDoc"],
    description: "Add a labeled training document to an existing Bayes classifier.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The classifier name"),
        forgescript_1.Arg.requiredString("label", "The label for this training document"),
        forgescript_1.Arg.restString("text", "The text to classify"),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [name, label, texts]) {
        try {
            if (texts.length == 0)
                return this.customError("No document provided.");
            for (const text of texts) {
                const added = structures_1.BayesClassifierManager.addDocument(name, text, label);
                if (!added) {
                    return this.customError(`Classifier ${name} not found.`);
                }
            }
            return this.success(true);
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=addClassifierDocument.js.map
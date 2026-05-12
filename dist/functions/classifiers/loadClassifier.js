"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$loadClassifier",
    aliases: ["$importClassifier"],
    description: "Load a Bayes classifier from a serialized JSON file.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The classifier name"),
        forgescript_1.Arg.requiredString("path", "Path to the classifier JSON file"),
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [name, path]) {
        try {
            const loaded = await structures_1.BayesClassifierManager.loadClassifier(name, path);
            if (!loaded) {
                return this.customError(`Unable to load classifier ${name} from ${path}.`);
            }
            return this.success(true);
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=loadClassifier.js.map
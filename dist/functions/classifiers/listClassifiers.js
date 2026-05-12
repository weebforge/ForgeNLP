"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const structures_1 = require("../../structures");
exports.default = new forgescript_1.NativeFunction({
    name: "$listClassifiers",
    aliases: ["$classifierList"],
    description: "List all registered Bayes classifier instances.",
    version: "1.0.0",
    unwrap: true,
    args: [],
    output: (0, forgescript_1.array)(),
    execute(ctx) {
        try {
            const names = structures_1.BayesClassifierManager.getAllNames();
            return this.successJSON(names);
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=listClassifiers.js.map
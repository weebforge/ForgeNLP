"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = require("../../natural");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$stringDistance",
    description: "Returns a string distance or similarity result using the selected algorithm.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredEnum(natural_1.StringDistanceAlgorithm, "algorithm", "The string distance algorithm to use."),
        forgescript_1.Arg.requiredString("string1", "The first string."),
        forgescript_1.Arg.requiredString("string2", "The second string."),
        forgescript_1.Arg.optionalString("options", "Optional JSON options."),
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [algorithm, str1, str2, options]) {
        try {
            const parsedOptions = options ? JSON.parse(options) : undefined;
            return this.success(natural_1.StringDistance.Compare(algorithm, str1, str2, parsedOptions));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=stringDistance.js.map
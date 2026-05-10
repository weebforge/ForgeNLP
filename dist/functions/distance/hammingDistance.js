"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const natural_1 = require("../../natural");
exports.default = new forgescript_1.NativeFunction({
    name: "$hammingDistance",
    description: "Hamming distance measures the distance between two strings of equal length by counting the number of different characters.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("string1", "The first string"),
        forgescript_1.Arg.requiredString("string2", "The second string"),
        forgescript_1.Arg.optionalBoolean("ignoreCase", "Whether case should be ignored. By default the algorithm is case sensitive."),
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [str1, str2, ignoreCase]) {
        try {
            return this.success(natural_1.StringDistance.Hamming(str1, str2, ignoreCase ?? false));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=hammingDistance.js.map
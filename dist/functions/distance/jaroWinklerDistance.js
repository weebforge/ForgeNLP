"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const natural_1 = require("../../natural");
exports.default = new forgescript_1.NativeFunction({
    name: "$jaroWinklerDistance",
    description: "Calculates the Jaro-Winkler similarity between two strings.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("string1", "The first string"),
        forgescript_1.Arg.requiredString("string2", "The second string"),
        forgescript_1.Arg.optionalNumber("dj", "The Winkler boost threshold."),
        forgescript_1.Arg.optionalBoolean("ignoreCase", "Whether case should be ignored."),
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [str1, str2, dj, ignoreCase]) {
        try {
            ignoreCase ??= false;
            return this.success(natural_1.StringDistance.JaroWinkler(str1, str2, {
                dj: dj ?? undefined,
                ignoreCase,
            }));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=jaroWinklerDistance.js.map
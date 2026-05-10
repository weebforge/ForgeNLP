"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const natural_1 = require("../../natural");
exports.default = new forgescript_1.NativeFunction({
    name: "$levenshteinDistance",
    description: "Calculates the Levenshtein distance between two strings.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("string1", "The first string"),
        forgescript_1.Arg.requiredString("string2", "The second string"),
        forgescript_1.Arg.optionalNumber("insertionCost", "The insertion cost."),
        forgescript_1.Arg.optionalNumber("deletionCost", "The deletion cost."),
        forgescript_1.Arg.optionalNumber("substitutionCost", "The substitution cost."),
        forgescript_1.Arg.optionalNumber("transpositionCost", "The transposition cost."),
        forgescript_1.Arg.optionalBoolean("restricted", "Whether restricted Damerau-Levenshtein should be used."),
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [str1, str2, insertion_cost, deletion_cost, substitution_cost, transposition_cost, restricted]) {
        try {
            insertion_cost ??= 1;
            deletion_cost ??= 1;
            substitution_cost ??= 1;
            transposition_cost ??= 1;
            restricted ??= false;
            return this.success(natural_1.StringDistance.Levenshtein(str1, str2, {
                insertion_cost,
                deletion_cost,
                substitution_cost,
                transposition_cost,
                restricted,
            }));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=levenshteinDistance.js.map
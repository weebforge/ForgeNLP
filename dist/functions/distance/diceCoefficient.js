"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const natural_1 = require("../../natural");
exports.default = new forgescript_1.NativeFunction({
    name: "$diceCoefficient",
    description: "Calculates the Dice coefficient similarity between two strings.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("string1", "The first string"), forgescript_1.Arg.requiredString("string2", "The second string")],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [str1, str2]) {
        try {
            return this.success(natural_1.StringDistance.DiceCoefficient(str1, str2));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=diceCoefficient.js.map
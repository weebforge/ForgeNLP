"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const words_1 = require("../../properties/words");
exports.default = new forgescript_1.NativeFunction({
    name: "$wordsCount",
    aliases: ["$wordsDatasetSize", "$wordCount"],
    description: "Returns the number of loaded words in the current dataset.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [
        forgescript_1.Arg.optionalEnum(words_1.WordsCountFilterProperty, "filter", "The filter to apply."),
        forgescript_1.Arg.optionalString("value", "Filter input if needed"),
    ],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [filter, value]) {
        try {
            filter ??= words_1.WordsCountFilterProperty.all;
            return this.success(words_1.WordsCountFilterProperties[filter](value));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=wordsCount.js.map
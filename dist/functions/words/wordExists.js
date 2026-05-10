"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const WordsManager_1 = require("../../structures/WordsManager");
exports.default = new forgescript_1.NativeFunction({
    name: "$wordExists",
    aliases: ["$wordInDataset", "$isValidWord"],
    description: "Returns the number of loaded words in the current dataset.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("word", "The word to check"), forgescript_1.Arg.optionalString("source", "Source key")],
    output: forgescript_1.ArgType.Number,
    execute(ctx, [word, source]) {
        try {
            return this.success(WordsManager_1.WordsManager.hasWord(word, source ?? undefined));
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=wordExists.js.map
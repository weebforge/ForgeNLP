"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const WordsManager_1 = require("../../structures/WordsManager");
exports.default = new forgescript_1.NativeFunction({
    name: "$getWordData",
    aliases: ["$wordData", "$wordInfo"],
    description: "Returns detailed information about a word including all occurrences and sources.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("word", "The word to get data for")],
    output: forgescript_1.ArgType.Json,
    execute(ctx, [word]) {
        try {
            const data = WordsManager_1.WordsManager.getWord(word);
            if (!data)
                return this.success();
            return this.successJSON(data);
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=getWordData.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const WordsManager_1 = require("../../structures/WordsManager");
exports.default = new forgescript_1.NativeFunction({
    name: "$saveWords",
    aliases: ["$saveWordList", "$exportWords"],
    description: "Saves words to a file (TXT or JSON format).",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("path", "Output file path (.txt or .json)"),
        forgescript_1.Arg.restString("words", "Optional specific words to save. If omitted, all words are saved."),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [path, words]) {
        try {
            const wordList = words.filter(Boolean).length > 0 ? words.filter(Boolean) : undefined;
            if (path.endsWith(".txt")) {
                await WordsManager_1.WordsManager.saveAsTXT(path, wordList);
                return this.success();
            }
            else if (path.endsWith(".json")) {
                await WordsManager_1.WordsManager.saveAsJSON(path, wordList);
                return this.success();
            }
            else {
                return this.customError("File must end with .txt or .json");
            }
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=saveWords.js.map
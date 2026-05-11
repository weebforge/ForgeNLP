"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const WordsManager_1 = require("../../structures/WordsManager");
exports.default = new forgescript_1.NativeFunction({
    name: "$getWordsWithInitials",
    aliases: ["$initialWords", "$wordsStartingWith"],
    description: "Returns all words starting with a specific letter.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("letter", "The starting letter"),
        forgescript_1.Arg.optionalString("variable", "The variable to load the results to"),
    ],
    output: (0, forgescript_1.array)(),
    execute(ctx, [letter, variable]) {
        try {
            const words = WordsManager_1.WordsManager.getWordsWithInitials(letter);
            if (!variable)
                return this.successJSON(words);
            ctx.setEnvironmentKey(variable, words);
            return this.success();
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=getWordsWithInitials.js.map
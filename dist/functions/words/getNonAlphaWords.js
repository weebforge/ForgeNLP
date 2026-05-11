"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const WordsManager_1 = require("../../structures/WordsManager");
exports.default = new forgescript_1.NativeFunction({
    name: "$getNonAlphaWords",
    aliases: ["$nonAlphaWords", "$specialWords"],
    description: "Returns all non-alphabetic words (containing special characters or numbers).",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalString("variable", "The variable to load the results to")],
    output: (0, forgescript_1.array)(),
    execute(ctx, [variable]) {
        try {
            const words = WordsManager_1.WordsManager.getNonAlphaWords();
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
//# sourceMappingURL=getNonAlphaWords.js.map
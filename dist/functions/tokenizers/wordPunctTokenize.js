"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const tokenizer_1 = require("../../natural/tokenizer");
exports.default = new forgescript_1.NativeFunction({
    name: "$wordPunctTokenize",
    aliases: ["$wordPunctTokenizer"],
    description: "Tokenizes text into words while preserving punctuation.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("text", "The text to tokenize"),
        forgescript_1.Arg.optionalString("variable", "The variable to load the results to"),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [text, variable]) {
        try {
            const tokens = tokenizer_1.Tokenizer.WordPunct(text);
            if (!variable)
                return this.successJSON(tokens);
            ctx.setEnvironmentKey(variable, tokens);
            return this.success();
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=wordPunctTokenize.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const tokenizer_1 = require("../../natural/tokenizer");
const tokenize_1 = require("./tokenize");
exports.default = new forgescript_1.NativeFunction({
    name: "$regexTokenize",
    aliases: ["$regexpTokenize", "$regexTokenizer"],
    description: "Tokenizes text using a RegExp pattern.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("text", "The text to tokenize"),
        forgescript_1.Arg.optionalString("pattern", "The regex pattern. If not provided, uses the pattern set by $setRegExpTokenizerPattern"),
        forgescript_1.Arg.optionalString("flags", "Optional regex flags (i, g, m, etc.)"),
        forgescript_1.Arg.optionalString("variable", "The variable to load the results to"),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [text, pattern, flags, variable]) {
        try {
            let regex;
            if (pattern) {
                regex = new RegExp(pattern, flags || undefined);
            }
            else {
                let _regex = ctx.getEnvironmentKey(tokenize_1.RegExp_Tokenizer_Pattern_Key);
                if (!_regex)
                    return this.customError("No regex pattern found. Provide a pattern argument or use $setRegExpTokenizerPattern first.");
                if (!(_regex instanceof RegExp))
                    return this.customError("The stored pattern must be a RegExp object.");
                regex = _regex;
            }
            const tokens = tokenizer_1.Tokenizer.RegExp(text, { pattern: regex });
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
//# sourceMappingURL=regexTokenize.js.map
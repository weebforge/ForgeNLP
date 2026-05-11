"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExp_Tokenizer_Pattern_Key = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const tokenizer_1 = require("../../natural/tokenizer");
exports.RegExp_Tokenizer_Pattern_Key = "regex_pattern";
exports.default = new forgescript_1.NativeFunction({
    name: "$tokenize",
    description: "Tokenizes text into words or sentences.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredEnum(tokenizer_1.TokenizerType, "type", "Tokenizer type (Word or Sentence)"),
        forgescript_1.Arg.requiredString("text", "The text to tokenize"),
        forgescript_1.Arg.optionalString("variable", "The variable to load the results to"),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [type, text, variable]) {
        try {
            let tokens;
            if (type === tokenizer_1.TokenizerType.Word) {
                tokens = tokenizer_1.Tokenizer.Word(text);
            }
            else if (type === tokenizer_1.TokenizerType.Sentence) {
                tokens = tokenizer_1.Tokenizer.Sentence(text);
            }
            else if (type === tokenizer_1.TokenizerType.RegExp) {
                let pattern = ctx.getEnvironmentKey(exports.RegExp_Tokenizer_Pattern_Key);
                if (!pattern)
                    return this.customError("No regexp pattern found.");
                if (!(pattern instanceof RegExp))
                    return this.customError("The regexp pattern must be a RegExp object.");
                tokens = tokenizer_1.Tokenizer.RegExp(text, { pattern });
            }
            else if (type === tokenizer_1.TokenizerType.TreebankWord) {
                tokens = tokenizer_1.Tokenizer.TreebankWord(text);
            }
            else if (type === tokenizer_1.TokenizerType.Case) {
                tokens = tokenizer_1.Tokenizer.Case(text);
            }
            else if (type === tokenizer_1.TokenizerType.WordPunct) {
                tokens = tokenizer_1.Tokenizer.WordPunct(text);
            }
            else {
                return this.customError(`Unknown tokenizer type: ${type}`);
            }
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
//# sourceMappingURL=tokenize.js.map
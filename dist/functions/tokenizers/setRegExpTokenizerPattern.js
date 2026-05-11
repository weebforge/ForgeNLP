"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const tokenize_1 = require("./tokenize");
exports.default = new forgescript_1.NativeFunction({
    name: "$setRegExpTokenizerPattern",
    aliases: ["$setRegexTokenizerPattern"],
    description: "Sets the RegExp pattern used by the RegExp tokenizer.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("pattern", "The regular expression pattern (without slashes)."),
        forgescript_1.Arg.optionalString("flags", "Optional RegExp flags, such as i, g, m."),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [pattern, flags]) {
        try {
            const regex = new RegExp(pattern, flags || undefined);
            ctx.setEnvironmentKey(tokenize_1.RegExp_Tokenizer_Pattern_Key, regex);
            return this.success(regex.toString());
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=setRegExpTokenizerPattern.js.map
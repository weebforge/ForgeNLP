import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { Tokenizer } from "../../natural/tokenizer"
import { RegExp_Tokenizer_Pattern_Key } from "./tokenize"

export default new NativeFunction({
  name: "$regexTokenize",
  aliases: ["$regexpTokenize", "$regexTokenizer"],
  description: "Tokenizes text using a RegExp pattern.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("text", "The text to tokenize"),
    Arg.optionalString(
      "pattern",
      "The regex pattern. If not provided, uses the pattern set by $setRegExpTokenizerPattern"
    ),
    Arg.optionalString("flags", "Optional regex flags (i, g, m, etc.)"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: ArgType.String,
  execute(ctx, [text, pattern, flags, variable]) {
    try {
      let regex: RegExp

      if (pattern) {
        regex = new RegExp(pattern, flags || undefined)
      } else {
        let _regex = ctx.getEnvironmentKey(RegExp_Tokenizer_Pattern_Key)
        if (!_regex)
          return this.customError(
            "No regex pattern found. Provide a pattern argument or use $setRegExpTokenizerPattern first."
          )
        if (!(_regex instanceof RegExp)) return this.customError("The stored pattern must be a RegExp object.")
        regex = _regex
      }

      const tokens = Tokenizer.RegExp(text, { pattern: regex })
      if (!variable) return this.successJSON(tokens)
      ctx.setEnvironmentKey(variable, tokens)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

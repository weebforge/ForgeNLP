import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { RegExp_Tokenizer_Pattern_Key } from "./tokenize"

export default new NativeFunction({
  name: "$setRegExpTokenizerPattern",
  aliases: ["$setRegexTokenizerPattern"],
  description: "Sets the RegExp pattern used by the RegExp tokenizer.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("pattern", "The regular expression pattern (without slashes)."),
    Arg.optionalString("flags", "Optional RegExp flags, such as i, g, m."),
  ],
  output: ArgType.String,
  execute(ctx, [pattern, flags]) {
    try {
      const regex = new RegExp(pattern, flags || undefined)
      ctx.setEnvironmentKey(RegExp_Tokenizer_Pattern_Key, regex)
      return this.success(regex.toString())
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

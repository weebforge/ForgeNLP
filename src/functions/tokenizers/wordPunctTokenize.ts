import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { Tokenizer } from "../../natural/tokenizer"

export default new NativeFunction({
  name: "$wordPunctTokenize",
  aliases: ["$wordPunctTokenizer"],
  description: "Tokenizes text into words while preserving punctuation.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("text", "The text to tokenize"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: ArgType.String,
  execute(ctx, [text, variable]) {
    try {
      const tokens = Tokenizer.WordPunct(text)

      if (!variable) return this.successJSON(tokens)
      ctx.setEnvironmentKey(variable, tokens)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

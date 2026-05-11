import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { Tokenizer } from "../../natural/tokenizer"

export default new NativeFunction({
  name: "$caseTokenize",
  aliases: ["$caseTokenizer"],
  description: "Tokenizes text based on case changes.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("text", "The text to tokenize"),
    Arg.optionalBoolean("preserveApostrophe", "Preserve apostrophes in contractions (default: false)"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: ArgType.String,
  execute(ctx, [text, preserveApostrophe, variable]) {
    try {
      const tokens = Tokenizer.Case(text, { preserveApostrophe: preserveApostrophe ?? false })

      if (!variable) return this.successJSON(tokens)
      ctx.setEnvironmentKey(variable, tokens)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

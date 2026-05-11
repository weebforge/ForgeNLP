import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { Tokenizer } from "../../natural/tokenizer"

export default new NativeFunction({
  name: "$sentenceTokenize",
  aliases: ["$sentenceTokenizer"],
  description: "Tokenizes text into sentences.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("text", "The text to tokenize"),

    Arg.optionalString("variable", "The variable to load the results to"),
    Arg.restString("abbreviations", "Optional sentence abbreviations (e.g., Dr., Mr., etc.)"),
  ],
  output: ArgType.String,
  execute(ctx, [text, variable, abbreviations]) {
    try {
      const tokens = Tokenizer.Sentence(text, { abbreviations: abbreviations.filter(Boolean) })
      if (!variable) return this.successJSON(tokens)
      ctx.setEnvironmentKey(variable, tokens)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

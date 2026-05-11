import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { Tokenizer } from "../../natural/tokenizer"

export default new NativeFunction({
  name: "$treebankWordTokenize",
  aliases: ["$treebankTokenize", "$treebankWordTokenizer"],
  description: "Tokenizes text using the Treebank word tokenizer.",
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
      const tokens = Tokenizer.TreebankWord(text)

      if (!variable) return this.successJSON(tokens)
      ctx.setEnvironmentKey(variable, tokens)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

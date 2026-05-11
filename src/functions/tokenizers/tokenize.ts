import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { Tokenizer, TokenizerType } from "../../natural/tokenizer"

export const RegExp_Tokenizer_Pattern_Key = "regex_pattern"

export default new NativeFunction({
  name: "$tokenize",
  description: "Tokenizes text into words or sentences.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredEnum(TokenizerType, "type", "Tokenizer type (Word or Sentence)"),
    Arg.requiredString("text", "The text to tokenize"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: ArgType.String,
  execute(ctx, [type, text, variable]) {
    try {
      let tokens: string[]

      if (type === TokenizerType.Word) {
        tokens = Tokenizer.Word(text)
      } else if (type === TokenizerType.Sentence) {
        tokens = Tokenizer.Sentence(text)
      } else if (type === TokenizerType.RegExp) {
        let pattern = ctx.getEnvironmentKey(RegExp_Tokenizer_Pattern_Key)
        if (!pattern) return this.customError("No regexp pattern found.")
        if (!(pattern instanceof RegExp)) return this.customError("The regexp pattern must be a RegExp object.")
        tokens = Tokenizer.RegExp(text, { pattern })
      } else if (type === TokenizerType.TreebankWord) {
        tokens = Tokenizer.TreebankWord(text)
      } else if (type === TokenizerType.Case) {
        tokens = Tokenizer.Case(text)
      } else if (type === TokenizerType.WordPunct) {
        tokens = Tokenizer.WordPunct(text)
      } else {
        return this.customError(`Unknown tokenizer type: ${type}`)
      }

      if (!variable) return this.successJSON(tokens)
      ctx.setEnvironmentKey(variable, tokens)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

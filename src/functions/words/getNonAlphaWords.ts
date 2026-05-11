import { Arg, ArgType, array, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$getNonAlphaWords",
  aliases: ["$nonAlphaWords", "$specialWords"],
  description: "Returns all non-alphabetic words (containing special characters or numbers).",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("variable", "The variable to load the results to")],
  output: array<ArgType.String>(),
  execute(ctx, [variable]) {
    try {
      const words = WordsManager.getNonAlphaWords()
      if (!variable) return this.successJSON(words)
      ctx.setEnvironmentKey(variable, words)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

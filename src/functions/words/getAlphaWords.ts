import { Arg, ArgType, array, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$getAlphaWords",
  aliases: ["$alphaWords", "$alphabeticWords"],
  description: "Returns all alphabetic words (letters only).",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("variable", "The variable to load the results to")],
  output: array<ArgType.String>(),
  execute(ctx, [variable]) {
    try {
      const words = WordsManager.getAlphaWords()
      if (!variable) return this.successJSON(words)
      ctx.setEnvironmentKey(variable, words)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

import { Arg, ArgType, array, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$getWordsOfLength",
  aliases: ["$wordsByLength"],
  description: "Returns all words of a specific length.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredNumber("length", "The word length to filter by"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: array<ArgType.String>(),
  execute(ctx, [length, variable]) {
    try {
      const words = WordsManager.getWordsOfLength(length)
      if (!variable) return this.successJSON(words)
      ctx.setEnvironmentKey(variable, words)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

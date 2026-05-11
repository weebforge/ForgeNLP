import { Arg, ArgType, array, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$getWordsWithInitials",
  aliases: ["$initialWords", "$wordsStartingWith"],
  description: "Returns all words starting with a specific letter.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("letter", "The starting letter"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: array<ArgType.String>(),
  execute(ctx, [letter, variable]) {
    try {
      const words = WordsManager.getWordsWithInitials(letter)
      if (!variable) return this.successJSON(words)
      ctx.setEnvironmentKey(variable, words)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

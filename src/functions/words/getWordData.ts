import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$getWordData",
  aliases: ["$wordData", "$wordInfo"],
  description: "Returns detailed information about a word including all occurrences and sources.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("word", "The word to get data for")],
  output: ArgType.Json,
  execute(ctx, [word]) {
    try {
      const data = WordsManager.getWord(word)
      if (!data) return this.success()

      return this.successJSON(data)
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

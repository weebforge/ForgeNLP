import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$wordExists",
  aliases: ["$wordInDataset", "$isValidWord"],
  description: "Returns the number of loaded words in the current dataset.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("word", "The word to check"), Arg.optionalString("source", "Source key")],
  output: ArgType.Number,
  execute(ctx, [word, source]) {
    try {
      return this.success(WordsManager.hasWord(word, source ?? undefined))
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export default new NativeFunction({
  name: "$saveWords",
  aliases: ["$saveWordList", "$exportWords"],
  description: "Saves words to a file (TXT or JSON format).",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("path", "Output file path (.txt or .json)"),
    Arg.restString("words", "Optional specific words to save. If omitted, all words are saved."),
  ],
  output: ArgType.String,
  async execute(ctx, [path, words]) {
    try {
      const wordList = words.filter(Boolean).length > 0 ? words.filter(Boolean) : undefined

      if (path.endsWith(".txt")) {
        await WordsManager.saveAsTXT(path, wordList)
        return this.success()
      } else if (path.endsWith(".json")) {
        await WordsManager.saveAsJSON(path, wordList)
        return this.success()
      } else {
        return this.customError("File must end with .txt or .json")
      }
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"
import { WordsCountFilterProperties, WordsCountFilterProperty } from "../../properties/words"

export default new NativeFunction({
  name: "$wordsCount",
  aliases: ["$wordsDatasetSize", "$wordCount"],
  description: "Returns the number of loaded words in the current dataset.",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [
    Arg.optionalEnum(WordsCountFilterProperty, "filter", "The filter to apply."),
    Arg.optionalString("value", "Filter input if needed"),
  ],
  output: ArgType.Number,
  execute(ctx, [filter, value]) {
    try {
      filter ??= WordsCountFilterProperty.all
      return this.success(WordsCountFilterProperties[filter](value))
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

import { StringDistance, StringDistanceAlgorithm } from "../../natural"
import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$stringDistance",
  description: "Returns a string distance or similarity result using the selected algorithm.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredEnum(StringDistanceAlgorithm, "algorithm", "The string distance algorithm to use."),
    Arg.requiredString("string1", "The first string."),
    Arg.requiredString("string2", "The second string."),
    Arg.optionalString("options", "Optional JSON options."),
  ],
  output: ArgType.Number,
  execute(ctx, [algorithm, str1, str2, options]) {
    try {
      const parsedOptions = options ? JSON.parse(options) : undefined

      return this.success(StringDistance.Compare(algorithm, str1, str2, parsedOptions))
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

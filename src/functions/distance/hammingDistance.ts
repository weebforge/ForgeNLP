import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { StringDistance } from "../../natural"

export default new NativeFunction({
  name: "$hammingDistance",
  description:
    "Hamming distance measures the distance between two strings of equal length by counting the number of different characters.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("string1", "The first string"),
    Arg.requiredString("string2", "The second string"),
    Arg.optionalBoolean("ignoreCase", "Whether case should be ignored. By default the algorithm is case sensitive."),
  ],
  output: ArgType.Number,
  execute(ctx, [str1, str2, ignoreCase]) {
    try {
      return this.success(StringDistance.Hamming(str1, str2, ignoreCase ?? false))
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

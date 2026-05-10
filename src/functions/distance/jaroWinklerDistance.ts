import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { StringDistance } from "../../natural"

export default new NativeFunction({
  name: "$jaroWinklerDistance",
  description: "Calculates the Jaro-Winkler similarity between two strings.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("string1", "The first string"),
    Arg.requiredString("string2", "The second string"),
    Arg.optionalNumber("dj", "The Winkler boost threshold."),
    Arg.optionalBoolean("ignoreCase", "Whether case should be ignored."),
  ],
  output: ArgType.Number,
  execute(ctx, [str1, str2, dj, ignoreCase]) {
    try {
      ignoreCase ??= false
      return this.success(
        StringDistance.JaroWinkler(str1, str2, {
          dj: dj ?? undefined,
          ignoreCase,
        })
      )
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

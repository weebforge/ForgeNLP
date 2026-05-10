import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { StringDistance } from "../../natural"

export default new NativeFunction({
  name: "$levenshteinDistance",
  description: "Calculates the Levenshtein distance between two strings.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("string1", "The first string"),
    Arg.requiredString("string2", "The second string"),
    Arg.optionalNumber("insertionCost", "The insertion cost."),
    Arg.optionalNumber("deletionCost", "The deletion cost."),
    Arg.optionalNumber("substitutionCost", "The substitution cost."),
    Arg.optionalNumber("transpositionCost", "The transposition cost."),
    Arg.optionalBoolean("restricted", "Whether restricted Damerau-Levenshtein should be used."),
  ],
  output: ArgType.Number,
  execute(ctx, [str1, str2, insertion_cost, deletion_cost, substitution_cost, transposition_cost, restricted]) {
    try {
      insertion_cost ??= 1
      deletion_cost ??= 1
      substitution_cost ??= 1
      transposition_cost ??= 1
      restricted ??= false
      return this.success(
        StringDistance.Levenshtein(str1, str2, {
          insertion_cost,
          deletion_cost,
          substitution_cost,
          transposition_cost,
          restricted,
        })
      )
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

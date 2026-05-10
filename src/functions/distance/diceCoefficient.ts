import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { StringDistance } from "../../natural"

export default new NativeFunction({
  name: "$diceCoefficient",
  description: "Calculates the Dice coefficient similarity between two strings.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("string1", "The first string"), Arg.requiredString("string2", "The second string")],
  output: ArgType.Number,
  execute(ctx, [str1, str2]) {
    try {
      return this.success(StringDistance.DiceCoefficient(str1, str2))
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

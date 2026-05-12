import { Arg, ArgType, array, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$listClassifiers",
  aliases: ["$classifierList"],
  description: "List all registered Bayes classifier instances.",
  version: "1.0.0",
  unwrap: true,
  args: [],
  output: array<ArgType.String>(),
  execute(ctx) {
    try {
      const names = BayesClassifierManager.getAllNames()
      return this.successJSON(names)
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

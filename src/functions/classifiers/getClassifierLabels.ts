import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$getClassifierLabels",
  aliases: ["$classifierLabels"],
  description: "Get all labels/categories for a trained classifier.",
  version: "1.0.1",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("name", "The classifier name"),
    Arg.optionalString("sep", "The separator to join the list"),
  ],
  output: ArgType.String,
  execute(ctx, [name, sep]) {
    try {
      const labels = BayesClassifierManager.getLabels(name)
      if (labels === null) {
        return this.customError(`Classifier ${name} not found or not trained.`)
      }
      return this.success(labels.join(sep ?? ", "))
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

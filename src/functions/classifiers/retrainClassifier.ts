import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$retrainClassifier",
  aliases: ["$classifierRetrain", "$trainClassifier"],
  description: "Retrain an existing Bayes classifier after adding documents.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The classifier name")],
  output: ArgType.Boolean,
  execute(ctx, [name]) {
    try {
      const retrained = BayesClassifierManager.retrain(name)
      if (!retrained) {
        return this.customError(`Classifier ${name} not found.`)
      }
      return this.success(true)
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

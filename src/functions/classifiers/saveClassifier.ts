import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$saveClassifier",
  aliases: ["$exportClassifier"],
  description: "Save a trained Bayes classifier to disk.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("name", "The classifier name"),
    Arg.requiredString("path", "Output path for the classifier JSON file"),
  ],
  output: ArgType.String,
  async execute(ctx, [name, path]) {
    try {
      const saved = await BayesClassifierManager.saveClassifier(name, path)
      if (!saved) {
        return this.customError(`Classifier ${name} not found or not trained.`)
      }
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

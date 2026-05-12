import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$createClassifier",
  aliases: ["$newClassifier", "$makeClassifier"],
  description: "Create a named Bayes classifier instance.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The classifier name")],
  output: ArgType.Boolean,
  execute(ctx, [name]) {
    try {
      const created = BayesClassifierManager.create(name)
      if (!created) {
        return this.customError(`Classifier ${name} already exists.`)
      }
      return this.success(true)
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

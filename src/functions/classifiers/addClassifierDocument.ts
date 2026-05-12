import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$addClassifierDocument",
  aliases: ["$classifierAddDoc"],
  description: "Add a labeled training document to an existing Bayes classifier.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("name", "The classifier name"),
    Arg.requiredString("label", "The label for this training document"),

    Arg.restString("text", "The text to classify"),
  ],
  output: ArgType.Boolean,
  execute(ctx, [name, label, texts]) {
    try {
      if (texts.length == 0) return this.customError("No document provided.")
      for (const text of texts) {
        const added = BayesClassifierManager.addDocument(name, text, label)
        if (!added) {
          return this.customError(`Classifier ${name} not found.`)
        }
      }
      return this.success(true)
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

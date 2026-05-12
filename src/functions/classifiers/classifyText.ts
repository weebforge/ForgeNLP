import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$classifyText",
  aliases: ["$classifierClassify", "$classify"],
  description: "Classify a text sample using a named Bayes classifier.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("name", "The classifier name"),
    Arg.requiredString("text", "Text to classify"),
    Arg.optionalString("variable", "The variable to load the results to"),
  ],
  output: ArgType.Json,
  execute(ctx, [name, text, variable]) {
    try {
      const result = BayesClassifierManager.classify(name, text)
      if (!result) {
        return this.customError(`Classifier ${name} not found or not trained.`)
      }
      if (!variable) return this.successJSON(result)
      ctx.setEnvironmentKey(variable, result)
      return this.success()
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BayesClassifierManager } from "../../structures"

export default new NativeFunction({
  name: "$loadClassifier",
  aliases: ["$importClassifier"],
  description: "Load a Bayes classifier from a serialized JSON file.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("name", "The classifier name"),
    Arg.requiredString("path", "Path to the classifier JSON file"),
  ],
  output: ArgType.Boolean,
  async execute(ctx, [name, path]) {
    try {
      const loaded = await BayesClassifierManager.loadClassifier(name, path)
      if (!loaded) {
        return this.customError(`Unable to load classifier ${name} from ${path}.`)
      }
      return this.success(true)
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { WordsManager } from "../../structures/WordsManager"

export enum WordDatasetSrcType {
  github = "github",
  local = "local",
}
export default new NativeFunction({
  name: "$loadWordDataset",
  aliases: ["$loadDataset", "$addWordDataset"],
  description: "Loads a word dataset from a local file or GitHub repository.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredEnum(WordDatasetSrcType, "type", "Source type (local or github)"),
    Arg.requiredString("path", "File path (for local) or repo path (for github)"),
    Arg.optionalString("repo", "GitHub repo (format: owner/repo, required for github type)"),
    Arg.optionalString("branch", "GitHub branch (default: main, for github type)"),
  ],
  output: ArgType.Number,
  async execute(ctx, [type, path, repo, branch]) {
    try {
      if (type === "local") {
        const result = await WordsManager.addLocal({ type: "local", src: { path } })
        return this.success(result)
      } else if (type === "github") {
        if (!repo) {
          return this.customError("repo parameter is required for github type (format: owner/repo)")
        }
        const result = await WordsManager.addGithub({
          type: "github",
          src: {
            repo: repo as `${string}/${string}`,
            branch: branch || "main",
            path,
          },
        })
        return this.success(result)
      } else {
        return this.customError(`Unknown dataset type: ${type}`)
      }
    } catch (error) {
      return this.customError(error instanceof Error ? error.message : String(error))
    }
  },
})

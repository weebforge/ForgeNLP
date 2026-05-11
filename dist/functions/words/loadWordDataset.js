"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordDatasetSrcType = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const WordsManager_1 = require("../../structures/WordsManager");
var WordDatasetSrcType;
(function (WordDatasetSrcType) {
    WordDatasetSrcType["github"] = "github";
    WordDatasetSrcType["local"] = "local";
})(WordDatasetSrcType || (exports.WordDatasetSrcType = WordDatasetSrcType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$loadWordDataset",
    aliases: ["$loadDataset", "$addWordDataset"],
    description: "Loads a word dataset from a local file or GitHub repository.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredEnum(WordDatasetSrcType, "type", "Source type (local or github)"),
        forgescript_1.Arg.requiredString("path", "File path (for local) or repo path (for github)"),
        forgescript_1.Arg.optionalString("repo", "GitHub repo (format: owner/repo, required for github type)"),
        forgescript_1.Arg.optionalString("branch", "GitHub branch (default: main, for github type)"),
    ],
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [type, path, repo, branch]) {
        try {
            if (type === "local") {
                const result = await WordsManager_1.WordsManager.addLocal({ type: "local", src: { path } });
                return this.success(result);
            }
            else if (type === "github") {
                if (!repo) {
                    return this.customError("repo parameter is required for github type (format: owner/repo)");
                }
                const result = await WordsManager_1.WordsManager.addGithub({
                    type: "github",
                    src: {
                        repo: repo,
                        branch: branch || "main",
                        path,
                    },
                });
                return this.success(result);
            }
            else {
                return this.customError(`Unknown dataset type: ${type}`);
            }
        }
        catch (error) {
            return this.customError(error instanceof Error ? error.message : String(error));
        }
    },
});
//# sourceMappingURL=loadWordDataset.js.map
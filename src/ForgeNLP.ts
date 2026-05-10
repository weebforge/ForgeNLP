import { ForgeClient, ForgeExtension } from "@tryforge/forgescript"
import { join } from "node:path"
import { WordDatasetSource, WordDatasetSourceType } from "./structures"
import { WordsManager } from "./structures/WordsManager"

export interface IForgeNLPOptions {
  wordDataset: WordDatasetSource<WordDatasetSourceType>[]
  loadDefaults?: boolean
}

export class ForgeNLP extends ForgeExtension {
  public name: string = "ForgeMath"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  public options: IForgeNLPOptions

  public constructor(opts: Partial<IForgeNLPOptions> = {}) {
    super()
    this.options = {
      wordDataset: opts.wordDataset || [],
      loadDefaults: opts.loadDefaults ?? false,
    }
  }

  public async init(client: ForgeClient): Promise<void> {
    this.load(join(__dirname, "functions"))

    if (this.options.loadDefaults) {
      try {
        await WordsManager.loadDefaults()
      } catch (e) {
        console.error("Failed to load default word datasets:", e)
      }
    }
    if (this.options.wordDataset.length) {
      try {
        for (const src of this.options.wordDataset) {
          await WordsManager.add(src)
        }
      } catch (e) {
        console.error("Failed to load default word datasets:", e)
      }
    }
  }
}

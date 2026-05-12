import { ForgeClient, ForgeExtension } from "@tryforge/forgescript"
import { join } from "node:path"
import {
  WordDatasetSource,
  WordDatasetSourceType,
  BayesClassifierManager,
  TrainingData,
  WordsManager,
} from "./structures"

export interface PredefinedClassifier {
  name: string
  modelPath?: string
  trainingData?: TrainingData[]
}

export interface IForgeNLPOptions {
  wordDataset: WordDatasetSource<WordDatasetSourceType>[]
  loadDefaults?: boolean
  classifiers?: PredefinedClassifier[]
}

export class ForgeNLP extends ForgeExtension {
  public name: string = "ForgeNLP"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  public options: IForgeNLPOptions

  public constructor(opts: Partial<IForgeNLPOptions> = {}) {
    super()
    this.options = {
      wordDataset: opts.wordDataset || [],
      loadDefaults: opts.loadDefaults ?? false,
      classifiers: opts.classifiers || [],
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

    if (this.options.classifiers?.length) {
      for (const classifierDef of this.options.classifiers) {
        if (!BayesClassifierManager.exists(classifierDef.name)) {
          BayesClassifierManager.create(classifierDef.name)
        }

        if (classifierDef.modelPath) {
          const loaded = await BayesClassifierManager.loadClassifier(classifierDef.name, classifierDef.modelPath)
          if (!loaded) {
            console.error(`Failed to load classifier ${classifierDef.name} from ${classifierDef.modelPath}`)
          }
        } else if (classifierDef.trainingData?.length) {
          try {
            BayesClassifierManager.train(classifierDef.name, classifierDef.trainingData)
          } catch (e) {
            console.error(`Failed to train classifier ${classifierDef.name}:`, e)
          }
        }
      }
    }
  }
}

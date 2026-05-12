"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeNLP = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const node_path_1 = require("node:path");
const structures_1 = require("./structures");
class ForgeNLP extends forgescript_1.ForgeExtension {
    name = "ForgeMath";
    description = require("../package.json").description;
    version = require("../package.json").version;
    options;
    constructor(opts = {}) {
        super();
        this.options = {
            wordDataset: opts.wordDataset || [],
            loadDefaults: opts.loadDefaults ?? false,
            classifiers: opts.classifiers || [],
        };
    }
    async init(client) {
        this.load((0, node_path_1.join)(__dirname, "functions"));
        if (this.options.loadDefaults) {
            try {
                await structures_1.WordsManager.loadDefaults();
            }
            catch (e) {
                console.error("Failed to load default word datasets:", e);
            }
        }
        if (this.options.wordDataset.length) {
            try {
                for (const src of this.options.wordDataset) {
                    await structures_1.WordsManager.add(src);
                }
            }
            catch (e) {
                console.error("Failed to load default word datasets:", e);
            }
        }
        if (this.options.classifiers?.length) {
            for (const classifierDef of this.options.classifiers) {
                if (!structures_1.BayesClassifierManager.exists(classifierDef.name)) {
                    structures_1.BayesClassifierManager.create(classifierDef.name);
                }
                if (classifierDef.modelPath) {
                    const loaded = await structures_1.BayesClassifierManager.loadClassifier(classifierDef.name, classifierDef.modelPath);
                    if (!loaded) {
                        console.error(`Failed to load classifier ${classifierDef.name} from ${classifierDef.modelPath}`);
                    }
                }
                else if (classifierDef.trainingData?.length) {
                    try {
                        structures_1.BayesClassifierManager.train(classifierDef.name, classifierDef.trainingData);
                    }
                    catch (e) {
                        console.error(`Failed to train classifier ${classifierDef.name}:`, e);
                    }
                }
            }
        }
    }
}
exports.ForgeNLP = ForgeNLP;
//# sourceMappingURL=ForgeNLP.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeNLP = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const node_path_1 = require("node:path");
const WordsManager_1 = require("./structures/WordsManager");
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
        };
    }
    async init(client) {
        this.load((0, node_path_1.join)(__dirname, "functions"));
        if (this.options.loadDefaults) {
            try {
                await WordsManager_1.WordsManager.loadDefaults();
            }
            catch (e) {
                console.error("Failed to load default word datasets:", e);
            }
        }
        if (this.options.wordDataset.length) {
            try {
                for (const src of this.options.wordDataset) {
                    await WordsManager_1.WordsManager.add(src);
                }
            }
            catch (e) {
                console.error("Failed to load default word datasets:", e);
            }
        }
    }
}
exports.ForgeNLP = ForgeNLP;
//# sourceMappingURL=ForgeNLP.js.map
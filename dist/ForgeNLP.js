"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeNLP = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const node_path_1 = require("node:path");
class ForgeNLP extends forgescript_1.ForgeExtension {
    name = "ForgeMath";
    description = require("../package.json").description;
    version = require("../package.json").version;
    init(client) {
        this.load((0, node_path_1.join)(__dirname, "functions"));
    }
}
exports.ForgeNLP = ForgeNLP;
//# sourceMappingURL=ForgeNLP.js.map
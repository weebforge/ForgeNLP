"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsCountFilterProperties = exports.WordsCountFilterProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
const structures_1 = require("../structures");
var WordsCountFilterProperty;
(function (WordsCountFilterProperty) {
    WordsCountFilterProperty["all"] = "all";
    WordsCountFilterProperty["alpha"] = "alpha";
    WordsCountFilterProperty["nonAlpha"] = "nonAlpha";
    WordsCountFilterProperty["length"] = "length";
    WordsCountFilterProperty["initial"] = "initial";
    WordsCountFilterProperty["src"] = "src";
})(WordsCountFilterProperty || (exports.WordsCountFilterProperty = WordsCountFilterProperty = {}));
exports.WordsCountFilterProperties = (0, defineProperties_1.default)({
    all: () => structures_1.WordsManager.getAllWords().length,
    alpha: () => structures_1.WordsManager.getAlphaWords().length,
    nonAlpha: () => structures_1.WordsManager.getNonAlphaWords().length,
    length: (f) => {
        let lengthValue = Number(f);
        if (Number.isNaN(lengthValue))
            lengthValue = f?.length ?? 0;
        return lengthValue ? structures_1.WordsManager.getWordsOfLength(lengthValue).length : 0;
    },
    initial: (f) => {
        const initial = f?.trim();
        if (!initial)
            return 0;
        return structures_1.WordsManager.getWordsWithInitials(initial).length;
    },
    src: (f) => {
        return typeof f == "string" ? (structures_1.WordsManager.getWordsBySource(f) ?? []).length : 0;
    },
});
//# sourceMappingURL=words.js.map
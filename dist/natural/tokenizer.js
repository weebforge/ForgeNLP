"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = exports.TokenizerType = void 0;
const natural_1 = require("natural");
var TokenizerType;
(function (TokenizerType) {
    TokenizerType["Word"] = "Word";
    TokenizerType["Sentence"] = "Sentence";
    TokenizerType["TreebankWord"] = "TreebankWord";
    TokenizerType["RegExp"] = "RegExp";
    TokenizerType["WordPunct"] = "WordPunct";
    TokenizerType["Case"] = "Case";
})(TokenizerType || (exports.TokenizerType = TokenizerType = {}));
exports.Tokenizer = {
    Word(text) {
        let tokenizer = new natural_1.WordTokenizer();
        return tokenizer.tokenize(text);
    },
    Sentence(text, options) {
        let tokenizer = new natural_1.SentenceTokenizer(options?.abbreviations || []);
        return tokenizer.tokenize(text);
    },
    TreebankWord(text) {
        let tokenizer = new natural_1.TreebankWordTokenizer();
        return tokenizer.tokenize(text);
    },
    RegExp(text, options) {
        let tokenizer = new natural_1.RegexpTokenizer({ pattern: options?.pattern });
        return tokenizer.tokenize(text);
    },
    WordPunct(text) {
        let tokenizer = new natural_1.WordPunctTokenizer();
        return tokenizer.tokenize(text);
    },
    Case(text, options) {
        let tokenizer = new natural_1.CaseTokenizer();
        return tokenizer.tokenize(text, options?.preserveApostrophe);
    },
};
//# sourceMappingURL=tokenizer.js.map
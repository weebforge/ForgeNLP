"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringDistance = exports.StringDistanceAlgorithm = void 0;
const natural_1 = require("natural");
var StringDistanceAlgorithm;
(function (StringDistanceAlgorithm) {
    StringDistanceAlgorithm["Hamming"] = "Hamming";
    StringDistanceAlgorithm["Levenshtein"] = "Levenshtein";
    StringDistanceAlgorithm["DamerauLevenshtein"] = "DamerauLevenshtein";
    StringDistanceAlgorithm["JaroWinkler"] = "JaroWinkler";
    StringDistanceAlgorithm["DiceCoefficient"] = "DiceCoefficient";
})(StringDistanceAlgorithm || (exports.StringDistanceAlgorithm = StringDistanceAlgorithm = {}));
function validateStrings(str1, str2) {
    if (typeof str1 !== "string") {
        throw new Error("First string is not of type string");
    }
    if (typeof str2 !== "string") {
        throw new Error("Second string is not of type string");
    }
    if (!(str1 && str2)) {
        throw new Error("Received empty string");
    }
}
exports.StringDistance = {
    Hamming(str1, str2, ignoreCase = false) {
        validateStrings(str1, str2);
        if (str1.length !== str2.length) {
            throw new Error("Hamming distance requires equal length strings");
        }
        return (0, natural_1.HammingDistance)(str1, str2, ignoreCase);
    },
    Levenshtein(str1, str2, options) {
        validateStrings(str1, str2);
        return (0, natural_1.LevenshteinDistance)(str1, str2, options);
    },
    DamerauLevenshtein(str1, str2, options) {
        validateStrings(str1, str2);
        return (0, natural_1.DamerauLevenshteinDistance)(str1, str2, options);
    },
    JaroWinkler(str1, str2, options) {
        validateStrings(str1, str2);
        return (0, natural_1.JaroWinklerDistance)(str1, str2, options);
    },
    DiceCoefficient(str1, str2) {
        validateStrings(str1, str2);
        return (0, natural_1.DiceCoefficient)(str1, str2);
    },
    Compare(algorithm, str1, str2, options) {
        switch (algorithm) {
            case StringDistanceAlgorithm.Hamming:
                return this.Hamming(str1, str2, options);
            case StringDistanceAlgorithm.Levenshtein:
                return this.Levenshtein(str1, str2, options);
            case StringDistanceAlgorithm.DamerauLevenshtein:
                return this.DamerauLevenshtein(str1, str2, options);
            case StringDistanceAlgorithm.JaroWinkler:
                return this.JaroWinkler(str1, str2, options);
            case StringDistanceAlgorithm.DiceCoefficient:
                return this.DiceCoefficient(str1, str2);
            default:
                throw new Error("Unknown string distance algorithm");
        }
    },
};
//# sourceMappingURL=string-distance.js.map
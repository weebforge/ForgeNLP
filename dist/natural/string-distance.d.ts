export interface JaroWinklerOptions {
    dj?: number;
    ignoreCase?: boolean;
}
export interface DamerauLevenshteinDistanceOptions {
    insertion_cost?: number;
    deletion_cost?: number;
    substitution_cost?: number;
    transposition_cost?: number;
    restricted?: boolean;
}
export declare enum StringDistanceAlgorithm {
    Hamming = "Hamming",
    Levenshtein = "Levenshtein",
    DamerauLevenshtein = "DamerauLevenshtein",
    JaroWinkler = "JaroWinkler",
    DiceCoefficient = "DiceCoefficient"
}
type StringDistanceOptionsMap = {
    [StringDistanceAlgorithm.Hamming]: boolean;
    [StringDistanceAlgorithm.Levenshtein]: DamerauLevenshteinDistanceOptions;
    [StringDistanceAlgorithm.DamerauLevenshtein]: DamerauLevenshteinDistanceOptions;
    [StringDistanceAlgorithm.JaroWinkler]: JaroWinklerOptions;
    [StringDistanceAlgorithm.DiceCoefficient]: undefined;
};
type StringDistanceResultMap = {
    [StringDistanceAlgorithm.Hamming]: number;
    [StringDistanceAlgorithm.Levenshtein]: number;
    [StringDistanceAlgorithm.DamerauLevenshtein]: number;
    [StringDistanceAlgorithm.JaroWinkler]: number;
    [StringDistanceAlgorithm.DiceCoefficient]: number;
};
export declare const StringDistance: {
    Hamming(str1: string, str2: string, ignoreCase?: boolean): number;
    Levenshtein(str1: string, str2: string, options?: DamerauLevenshteinDistanceOptions): number;
    DamerauLevenshtein(str1: string, str2: string, options?: DamerauLevenshteinDistanceOptions): number;
    JaroWinkler(str1: string, str2: string, options?: JaroWinklerOptions): number;
    DiceCoefficient(str1: string, str2: string): number;
    Compare<T extends StringDistanceAlgorithm>(algorithm: T, str1: string, str2: string, options?: StringDistanceOptionsMap[T]): StringDistanceResultMap[T];
};
export {};
//# sourceMappingURL=string-distance.d.ts.map
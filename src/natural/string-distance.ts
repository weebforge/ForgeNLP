import {
  DiceCoefficient,
  DamerauLevenshteinDistance,
  HammingDistance,
  JaroWinklerDistance,
  LevenshteinDistance,
} from "natural"

export interface JaroWinklerOptions {
  dj?: number
  ignoreCase?: boolean
}

export interface DamerauLevenshteinDistanceOptions {
  insertion_cost?: number
  deletion_cost?: number
  substitution_cost?: number
  transposition_cost?: number
  restricted?: boolean
}

export enum StringDistanceAlgorithm {
  Hamming = "Hamming",
  Levenshtein = "Levenshtein",
  DamerauLevenshtein = "DamerauLevenshtein",
  JaroWinkler = "JaroWinkler",
  DiceCoefficient = "DiceCoefficient",
}
type StringDistanceOptionsMap = {
  [StringDistanceAlgorithm.Hamming]: boolean
  [StringDistanceAlgorithm.Levenshtein]: DamerauLevenshteinDistanceOptions
  [StringDistanceAlgorithm.DamerauLevenshtein]: DamerauLevenshteinDistanceOptions
  [StringDistanceAlgorithm.JaroWinkler]: JaroWinklerOptions
  [StringDistanceAlgorithm.DiceCoefficient]: undefined
}

type StringDistanceResultMap = {
  [StringDistanceAlgorithm.Hamming]: number
  [StringDistanceAlgorithm.Levenshtein]: number
  [StringDistanceAlgorithm.DamerauLevenshtein]: number
  [StringDistanceAlgorithm.JaroWinkler]: number
  [StringDistanceAlgorithm.DiceCoefficient]: number
}

function validateStrings(str1: string, str2: string) {
  if (typeof str1 !== "string") {
    throw new Error("First string is not of type string")
  }

  if (typeof str2 !== "string") {
    throw new Error("Second string is not of type string")
  }

  if (!(str1 && str2)) {
    throw new Error("Received empty string")
  }
}

export const StringDistance = {
  /**
   * Hamming distance measures the distance between two strings of equal length by counting the number of different characters. The third parameter indicates whether case should be ignored. By default the algorithm is case sensitive.
   * @see https://en.wikipedia.org/wiki/Hamming_distance
   */
  Hamming(str1: string, str2: string, ignoreCase = false): number {
    validateStrings(str1, str2)

    if (str1.length !== str2.length) {
      throw new Error("Hamming distance requires equal length strings")
    }

    return HammingDistance(str1, str2, ignoreCase)
  },

  /**
   * The Levenshtein distance is a string metric for measuring the difference between two sequences. The Levenshtein distance between two words is the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other.
   * @see https://en.wikipedia.org/wiki/Levenshtein_distance
   */
  Levenshtein(str1: string, str2: string, options?: DamerauLevenshteinDistanceOptions): number {
    validateStrings(str1, str2)

    return LevenshteinDistance(str1, str2, options)
  },

  /**
   * the Damerau–Levenshtein distance is a string metric for measuring the edit distance between two sequences. Informally, the Damerau–Levenshtein distance between two words is the minimum number of operations (consisting of insertions, deletions or substitutions of a single character, or transposition of two adjacent characters) required to change one word into the other.
   * @see https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
   */
  DamerauLevenshtein(str1: string, str2: string, options?: DamerauLevenshteinDistanceOptions): number {
    validateStrings(str1, str2)

    return DamerauLevenshteinDistance(str1, str2, options)
  },

  /**
   * The Jaro–Winkler string distance measuring algorithm will return a number between 0 and 1 which tells how closely the strings match (0 = not at all, 1 = exact match).
   * @see http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
   */
  JaroWinkler(str1: string, str2: string, options?: JaroWinklerOptions): number {
    validateStrings(str1, str2)

    return JaroWinklerDistance(str1, str2, options)
  },

  /**
   * The Dice-Sørensen coefficient is a statistic used to gauge the similarity of two samples.
   * @see https://en.wikipedia.org/wiki/Dice-S%C3%B8rensen_coefficient
   */
  DiceCoefficient(str1: string, str2: string): number {
    validateStrings(str1, str2)

    return DiceCoefficient(str1, str2)
  },

  Compare<T extends StringDistanceAlgorithm>(
    algorithm: T,
    str1: string,
    str2: string,
    options?: StringDistanceOptionsMap[T]
  ): StringDistanceResultMap[T] {
    switch (algorithm) {
      case StringDistanceAlgorithm.Hamming:
        return this.Hamming(str1, str2, options as boolean) as StringDistanceResultMap[T]

      case StringDistanceAlgorithm.Levenshtein:
        return this.Levenshtein(str1, str2, options as DamerauLevenshteinDistanceOptions) as StringDistanceResultMap[T]

      case StringDistanceAlgorithm.DamerauLevenshtein:
        return this.DamerauLevenshtein(
          str1,
          str2,
          options as DamerauLevenshteinDistanceOptions
        ) as StringDistanceResultMap[T]

      case StringDistanceAlgorithm.JaroWinkler:
        return this.JaroWinkler(str1, str2, options as JaroWinklerOptions) as StringDistanceResultMap[T]

      case StringDistanceAlgorithm.DiceCoefficient:
        return this.DiceCoefficient(str1, str2) as StringDistanceResultMap[T]

      default:
        throw new Error("Unknown string distance algorithm")
    }
  },
}

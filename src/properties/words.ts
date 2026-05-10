import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties"
import { WordsManager } from "../structures"

export enum WordsCountFilterProperty {
  all = "all",
  alpha = "alpha",
  nonAlpha = "nonAlpha",
  length = "length",
  initial = "initial",
  src = "src",
}

export const WordsCountFilterProperties = defineProperties<typeof WordsCountFilterProperty, string>({
  all: () => WordsManager.getAllWords().length,
  alpha: () => WordsManager.getAlphaWords().length,
  nonAlpha: () => WordsManager.getNonAlphaWords().length,
  length: (f) => {
    let lengthValue = Number(f)
    if (Number.isNaN(lengthValue)) lengthValue = f?.length ?? 0
    return lengthValue ? WordsManager.getWordsOfLength(lengthValue).length : 0
  },
  initial: (f) => {
    const initial = f?.trim()
    if (!initial) return 0
    return WordsManager.getWordsWithInitials(initial).length
  },
  src: (f) => {
    return typeof f == "string" ? (WordsManager.getWordsBySource(f) ?? []).length : 0
  },
})

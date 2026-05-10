import { readFile, writeFile } from "fs/promises"

export type WordDatasetSourceType = "github" | "local"
export interface WordDatasetSource<T extends WordDatasetSourceType> {
  type: T
  src: T extends "github"
    ? {
        /** The github repo */
        repo: `${string}/${string}`
        /** The repo branch to target */
        branch: string
        /** Path to .txt or .json file */
        path: string
      }
    : T extends "local"
      ? {
          /** Path to .txt or .json file */
          path: string
        }
      : never
}
export const WordDatasetSourceDefaults: WordDatasetSource<"github">[] = [
  {
    type: "github",
    src: {
      repo: "WeebForge/ForgeNLP",
      branch: "main",
      path: "dataset/words.txt",
    },
  },
  {
    type: "github",
    src: {
      repo: "WeebForge/ForgeNLP",
      branch: "main",
      path: "dataset/words_alpha.txt",
    },
  },
]

export interface WordData {
  length: number
  word: string
  alpha: boolean
  src?: WordDatasetSource<WordDatasetSourceType>
}

export class WordsManager {
  public static Words = new Map<string, WordData[]>()
  static #lengthMaps = new Map<number, string[]>()
  static #alphaOnly: string[] = []
  static #nonAlpha: string[] = []
  static #srcMap = new Map<string, string[]>()
  static #initialMaps = new Map<string, string[]>()
  static #isLoadingDefaults = false

  static async loadDefaults(): Promise<number> {
    if (this.#isLoadingDefaults) return 0
    this.#isLoadingDefaults = true

    let totalAdded = 0
    for (const defaultSrc of WordDatasetSourceDefaults) {
      try {
        const count = await this.add(defaultSrc)
        totalAdded += count
      } catch (e) {
        console.error("Failed to load default dataset:", e)
      }
    }
    return totalAdded
  }

  static async add<T extends WordDatasetSourceType>(src: WordDatasetSource<T>): Promise<number> {
    if (isLocalSrc(src)) return this.addLocal(src)
    if (isGithubSrc(src)) return this.addGithub(src)
    throw new Error("Invalid Source Type")
  }
  static async addLocal(src: WordDatasetSource<"local">): Promise<number> {
    const content = await readFile(src.src.path, "utf-8")
    const words = this.#parseFile(content, src.src.path)
    return this.#_addsrc(words, src)
  }

  static async addGithub(src: WordDatasetSource<"github">): Promise<number> {
    const { repo, branch, path } = src.src
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
      }
      const content = await response.text()
      const words = this.#parseFile(content, path)
      return this.#_addsrc(words, src)
    } catch (e) {
      console.error(`Failed to load GitHub dataset from ${url}:`, e)
      return 0
    }
  }

  static getWord(word: string): WordData[] | null {
    return this.Words.get(word) ?? null
  }

  static getWordCount(word: string): number {
    return this.Words.get(word)?.length ?? 0
  }

  static getAllWords(): string[] {
    return Array.from(this.Words.keys())
  }

  static hasWord(word: string, src?: WordDatasetSource<WordDatasetSourceType> | string): boolean {
    return src
      ? typeof src == "string"
        ? (this.#srcMap.get(src)?.includes(word) ?? false)
        : this.getWordsBySource(src).includes(word)
      : this.Words.has(word)
  }

  static getWordsOfLength(length: number): string[] {
    return [...(this.#lengthMaps.get(length) ?? [])]
  }

  static getWordsWithInitials(initial: string): string[] {
    const key = initial.trim().charAt(0).toLowerCase()
    return key ? [...(this.#initialMaps.get(key) ?? [])] : []
  }

  static getAlphaWords(): string[] {
    return [...this.#alphaOnly]
  }

  static getNonAlphaWords(): string[] {
    return [...this.#nonAlpha]
  }

  static getWordsBySource(src: WordDatasetSource<WordDatasetSourceType> | string): string[] {
    return [...(this.#srcMap.get(typeof src == "object" ? this.#getSourceKey(src) : src) ?? [])]
  }

  static findWord(predicate: (word: string, entries: WordData[]) => boolean): string | null {
    for (const [word, entries] of this.Words.entries()) {
      if (predicate(word, entries)) {
        return word
      }
    }
    return null
  }

  static findWords(predicate: (word: string, entries: WordData[]) => boolean): string[] {
    const results: string[] = []
    for (const [word, entries] of this.Words.entries()) {
      if (predicate(word, entries)) {
        results.push(word)
      }
    }
    return results
  }

  static async saveAsTXT(path: string, words?: string[]): Promise<void> {
    const list = words ?? this.getAllWords()
    await writeFile(path, list.join("\n"), "utf-8")
  }

  static async saveAsJSON(path: string, words?: string[]): Promise<void> {
    const list = words ?? this.getAllWords()
    await writeFile(path, JSON.stringify(list), "utf-8")
  }

  static #getSourceKey(src?: WordDatasetSource<WordDatasetSourceType>): string {
    if (!src) return "unknown"
    return isLocalSrc(src)
      ? `${src.type}:${src.src.path}`
      : isGithubSrc(src)
        ? `${src.type}:${src.src.repo}/${src.src.branch}/${src.src.path}`
        : "unknown"
  }

  static #_addsrc(words: string[], src?: WordDatasetSource<WordDatasetSourceType>): number {
    let addedCount = 0
    const srcKey = this.#getSourceKey(src)

    for (const _word of words) {
      const word = _word.trim()
      if (!word) continue

      const wordLength = word.length
      const isAlpha = /^[a-z]+$/i.test(word)

      // Add to main Words map
      if (!this.Words.has(word)) {
        this.Words.set(word, [])
      }
      this.Words.get(word)!.push({
        length: wordLength,
        word,
        alpha: isAlpha,
        src,
      })

      // Add to length maps
      if (!this.#lengthMaps.has(wordLength)) {
        this.#lengthMaps.set(wordLength, [])
      }
      this.#lengthMaps.get(wordLength)!.push(word)

      // Add to alpha / non-alpha lists
      if (isAlpha) {
        this.#alphaOnly.push(word)
      } else {
        this.#nonAlpha.push(word)
      }

      // Add to initial maps
      const initial = word[0].toLowerCase()
      if (!this.#initialMaps.has(initial)) {
        this.#initialMaps.set(initial, [])
      }
      this.#initialMaps.get(initial)!.push(word)

      // Add to source map
      if (!this.#srcMap.has(srcKey)) {
        this.#srcMap.set(srcKey, [])
      }
      this.#srcMap.get(srcKey)!.push(word)

      addedCount++
    }

    return addedCount
  }

  static #parseFile(content: string, path: string): string[] {
    if (path.endsWith(".txt")) {
      return content.split("\n").filter((line) => line.trim().length > 0)
    } else if (path.endsWith(".json")) {
      try {
        const data = JSON.parse(content)
        if (Array.isArray(data)) {
          return data.filter((item) => typeof item === "string")
        } else if (typeof data === "object" && data !== null) {
          return Object.keys(data)
        }
      } catch (e) {
        console.error(`Failed to parse JSON from ${path}:`, e)
      }
    }
    return []
  }
}

function isLocalSrc(src: WordDatasetSource<any>): src is WordDatasetSource<"local"> {
  return src.type == "local"
}
function isGithubSrc(src: WordDatasetSource<any>): src is WordDatasetSource<"github"> {
  return src.type == "github"
}

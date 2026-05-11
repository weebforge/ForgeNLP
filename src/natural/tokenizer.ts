import {
  CaseTokenizer,
  RegexpTokenizer,
  SentenceTokenizer,
  TreebankWordTokenizer,
  WordPunctTokenizer,
  WordTokenizer,
} from "natural"

export enum TokenizerType {
  Word = "Word",
  Sentence = "Sentence",
  TreebankWord = "TreebankWord",
  RegExp = "RegExp",
  WordPunct = "WordPunct",
  Case = "Case",
}

export type TokenizerOptionsMap<T extends TokenizerType> = T extends TokenizerType.Sentence
  ? {
      abbreviations: string[]
    }
  : T extends TokenizerType.RegExp
    ? { pattern: RegExp }
    : T extends TokenizerType.Case
      ? { preserveApostrophe: boolean }
      : undefined

export const Tokenizer = {
  Word(text: string) {
    let tokenizer = new WordTokenizer()
    return tokenizer.tokenize(text)
  },
  Sentence(text: string, options?: TokenizerOptionsMap<TokenizerType.Sentence>) {
    let tokenizer = new SentenceTokenizer(options?.abbreviations || [])
    return tokenizer.tokenize(text)
  },
  TreebankWord(text: string) {
    let tokenizer = new TreebankWordTokenizer()
    return tokenizer.tokenize(text)
  },
  RegExp(text: string, options?: TokenizerOptionsMap<TokenizerType.RegExp>) {
    let tokenizer = new RegexpTokenizer({ pattern: options?.pattern })
    return tokenizer.tokenize(text)
  },
  WordPunct(text: string) {
    let tokenizer = new WordPunctTokenizer()
    return tokenizer.tokenize(text)
  },
  Case(text: string, options?: TokenizerOptionsMap<TokenizerType.Case>) {
    let tokenizer = new CaseTokenizer()
    return tokenizer.tokenize(text, options?.preserveApostrophe)
  },
}

export declare enum TokenizerType {
    Word = "Word",
    Sentence = "Sentence",
    TreebankWord = "TreebankWord",
    RegExp = "RegExp",
    WordPunct = "WordPunct",
    Case = "Case"
}
export type TokenizerOptionsMap<T extends TokenizerType> = T extends TokenizerType.Sentence ? {
    abbreviations: string[];
} : T extends TokenizerType.RegExp ? {
    pattern: RegExp;
} : T extends TokenizerType.Case ? {
    preserveApostrophe: boolean;
} : undefined;
export declare const Tokenizer: {
    Word(text: string): string[];
    Sentence(text: string, options?: TokenizerOptionsMap<TokenizerType.Sentence>): string[];
    TreebankWord(text: string): string[];
    RegExp(text: string, options?: TokenizerOptionsMap<TokenizerType.RegExp>): string[];
    WordPunct(text: string): string[];
    Case(text: string, options?: TokenizerOptionsMap<TokenizerType.Case>): string[];
};
//# sourceMappingURL=tokenizer.d.ts.map
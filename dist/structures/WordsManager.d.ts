export type WordDatasetSourceType = "github" | "local";
export interface WordDatasetSource<T extends WordDatasetSourceType> {
    type: T;
    src: T extends "github" ? {
        repo: `${string}/${string}`;
        branch: string;
        path: string;
    } : T extends "local" ? {
        path: string;
    } : never;
}
export declare const WordDatasetSourceDefaults: WordDatasetSource<"github">[];
export interface WordData {
    length: number;
    word: string;
    alpha: boolean;
    src?: WordDatasetSource<WordDatasetSourceType>;
}
export declare class WordsManager {
    #private;
    static Words: Map<string, WordData[]>;
    static loadDefaults(): Promise<number>;
    static add<T extends WordDatasetSourceType>(src: WordDatasetSource<T>): Promise<number>;
    static addLocal(src: WordDatasetSource<"local">): Promise<number>;
    static addGithub(src: WordDatasetSource<"github">): Promise<number>;
    static getWord(word: string): WordData[] | null;
    static getWordCount(word: string): number;
    static getAllWords(): string[];
    static hasWord(word: string): boolean;
    static getWordsOfLength(length: number): string[];
    static getWordsWithInitials(initial: string): string[];
    static getAlphaWords(): string[];
    static getNonAlphaWords(): string[];
    static getWordsBySource(src: WordDatasetSource<WordDatasetSourceType>): string[];
    static findWord(predicate: (word: string, entries: WordData[]) => boolean): string | null;
    static findWords(predicate: (word: string, entries: WordData[]) => boolean): string[];
    static saveAsTXT(path: string, words?: string[]): Promise<void>;
    static saveAsJSON(path: string, words?: string[]): Promise<void>;
}
//# sourceMappingURL=WordsManager.d.ts.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsManager = exports.WordDatasetSourceDefaults = void 0;
const promises_1 = require("fs/promises");
exports.WordDatasetSourceDefaults = [
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
];
class WordsManager {
    static Words = new Map();
    static #lengthMaps = new Map();
    static #alphaOnly = [];
    static #nonAlpha = [];
    static #srcMap = new Map();
    static #initialMaps = new Map();
    static #isLoadingDefaults = false;
    static async loadDefaults() {
        if (this.#isLoadingDefaults)
            return 0;
        this.#isLoadingDefaults = true;
        let totalAdded = 0;
        for (const defaultSrc of exports.WordDatasetSourceDefaults) {
            try {
                const count = await this.add(defaultSrc);
                totalAdded += count;
            }
            catch (e) {
                console.error("Failed to load default dataset:", e);
            }
        }
        return totalAdded;
    }
    static async add(src) {
        if (isLocalSrc(src))
            return this.addLocal(src);
        if (isGithubSrc(src))
            return this.addGithub(src);
        throw new Error("Invalid Source Type");
    }
    static async addLocal(src) {
        const content = await (0, promises_1.readFile)(src.src.path, "utf-8");
        const words = this.#parseFile(content, src.src.path);
        return this.#_addsrc(words, src);
    }
    static async addGithub(src) {
        const { repo, branch, path } = src.src;
        const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            const content = await response.text();
            const words = this.#parseFile(content, path);
            return this.#_addsrc(words, src);
        }
        catch (e) {
            console.error(`Failed to load GitHub dataset from ${url}:`, e);
            return 0;
        }
    }
    static getWord(word) {
        return this.Words.get(word) ?? null;
    }
    static getWordCount(word) {
        return this.Words.get(word)?.length ?? 0;
    }
    static getAllWords() {
        return Array.from(this.Words.keys());
    }
    static hasWord(word, src) {
        return src
            ? typeof src == "string"
                ? (this.#srcMap.get(src)?.includes(word) ?? false)
                : this.getWordsBySource(src).includes(word)
            : this.Words.has(word);
    }
    static getWordsOfLength(length) {
        return [...(this.#lengthMaps.get(length) ?? [])];
    }
    static getWordsWithInitials(initial) {
        const key = initial.trim().charAt(0).toLowerCase();
        return key ? [...(this.#initialMaps.get(key) ?? [])] : [];
    }
    static getAlphaWords() {
        return [...this.#alphaOnly];
    }
    static getNonAlphaWords() {
        return [...this.#nonAlpha];
    }
    static getWordsBySource(src) {
        return [...(this.#srcMap.get(typeof src == "object" ? this.#getSourceKey(src) : src) ?? [])];
    }
    static findWord(predicate) {
        for (const [word, entries] of this.Words.entries()) {
            if (predicate(word, entries)) {
                return word;
            }
        }
        return null;
    }
    static findWords(predicate) {
        const results = [];
        for (const [word, entries] of this.Words.entries()) {
            if (predicate(word, entries)) {
                results.push(word);
            }
        }
        return results;
    }
    static async saveAsTXT(path, words) {
        const list = words ?? this.getAllWords();
        await (0, promises_1.writeFile)(path, list.join("\n"), "utf-8");
    }
    static async saveAsJSON(path, words) {
        const list = words ?? this.getAllWords();
        await (0, promises_1.writeFile)(path, JSON.stringify(list), "utf-8");
    }
    static #getSourceKey(src) {
        if (!src)
            return "unknown";
        return isLocalSrc(src)
            ? `${src.type}:${src.src.path}`
            : isGithubSrc(src)
                ? `${src.type}:${src.src.repo}/${src.src.branch}/${src.src.path}`
                : "unknown";
    }
    static #_addsrc(words, src) {
        let addedCount = 0;
        const srcKey = this.#getSourceKey(src);
        for (const _word of words) {
            const word = _word.trim();
            if (!word)
                continue;
            const wordLength = word.length;
            const isAlpha = /^[a-z]+$/i.test(word);
            if (!this.Words.has(word)) {
                this.Words.set(word, []);
            }
            this.Words.get(word).push({
                length: wordLength,
                word,
                alpha: isAlpha,
                src,
            });
            if (!this.#lengthMaps.has(wordLength)) {
                this.#lengthMaps.set(wordLength, []);
            }
            this.#lengthMaps.get(wordLength).push(word);
            if (isAlpha) {
                this.#alphaOnly.push(word);
            }
            else {
                this.#nonAlpha.push(word);
            }
            const initial = word[0].toLowerCase();
            if (!this.#initialMaps.has(initial)) {
                this.#initialMaps.set(initial, []);
            }
            this.#initialMaps.get(initial).push(word);
            if (!this.#srcMap.has(srcKey)) {
                this.#srcMap.set(srcKey, []);
            }
            this.#srcMap.get(srcKey).push(word);
            addedCount++;
        }
        return addedCount;
    }
    static #parseFile(content, path) {
        if (path.endsWith(".txt")) {
            return content.split("\n").filter((line) => line.trim().length > 0);
        }
        else if (path.endsWith(".json")) {
            try {
                const data = JSON.parse(content);
                if (Array.isArray(data)) {
                    return data.filter((item) => typeof item === "string");
                }
                else if (typeof data === "object" && data !== null) {
                    return Object.keys(data);
                }
            }
            catch (e) {
                console.error(`Failed to parse JSON from ${path}:`, e);
            }
        }
        return [];
    }
}
exports.WordsManager = WordsManager;
function isLocalSrc(src) {
    return src.type == "local";
}
function isGithubSrc(src) {
    return src.type == "github";
}
//# sourceMappingURL=WordsManager.js.map
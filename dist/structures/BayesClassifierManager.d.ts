import { BayesClassifier } from "natural";
export interface TrainingData {
    text: string | string[];
    label: string;
    features?: Record<string, number>;
}
export interface ClassificationResult {
    label: string;
    probability: number;
    allProbabilities: Record<string, number>;
}
export interface ClassifierInstance {
    classifier: BayesClassifier;
    name: string;
    trained: boolean;
    trainingDataCount: number;
    lastTrained: Date | null;
    labels: string[];
}
export declare class BayesClassifierManager {
    private static classifiers;
    static create(name: string): boolean;
    static delete(name: string): boolean;
    static exists(name: string): boolean;
    static getAllNames(): string[];
    static getInfo(name: string): ClassifierInstance | null;
    static train(name: string, data: TrainingData[]): boolean;
    static addDocument(name: string, text: string, label: string): boolean;
    static retrain(name: string): boolean;
    static classify(name: string, text: string): ClassificationResult | null;
    static getClassifications(name: string, text: string): Array<{
        label: string;
        value: number;
    }> | null;
    static getClassProbability(name: string, text: string, label: string): number | null;
    static saveClassifier(name: string, filePath: string): Promise<boolean>;
    static loadClassifier(name: string, filePath: string): Promise<boolean>;
    static reset(name: string): boolean;
    static getStatistics(): Record<string, {
        trained: boolean;
        trainingDataCount: number;
        lastTrained: Date | null;
    }>;
    static getLabels(name: string): string[] | null;
    static getClassifier(name: string): BayesClassifier | null;
}
//# sourceMappingURL=BayesClassifierManager.d.ts.map
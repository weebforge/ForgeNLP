"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BayesClassifierManager = void 0;
const natural_1 = require("natural");
class BayesClassifierManager {
    static classifiers = new Map();
    static create(name) {
        if (this.classifiers.has(name)) {
            return false;
        }
        const classifier = new natural_1.BayesClassifier();
        this.classifiers.set(name, {
            classifier,
            name,
            trained: false,
            trainingDataCount: 0,
            lastTrained: null,
            labels: [],
        });
        return true;
    }
    static delete(name) {
        return this.classifiers.delete(name);
    }
    static exists(name) {
        return this.classifiers.has(name);
    }
    static getAllNames() {
        return Array.from(this.classifiers.keys());
    }
    static getInfo(name) {
        const instance = this.classifiers.get(name);
        if (!instance)
            return null;
        return {
            ...instance,
            classifier: instance.classifier,
        };
    }
    static train(name, data) {
        const instance = this.classifiers.get(name);
        if (!instance)
            return false;
        instance.classifier = new natural_1.BayesClassifier();
        let totalDocuments = 0;
        const labelsSet = new Set();
        for (const item of data) {
            const texts = Array.isArray(item.text) ? item.text : [item.text];
            for (const text of texts) {
                instance.classifier.addDocument(text, item.label);
                labelsSet.add(item.label);
                totalDocuments++;
            }
        }
        instance.classifier.train();
        instance.trained = true;
        instance.trainingDataCount = totalDocuments;
        instance.lastTrained = new Date();
        instance.labels = Array.from(labelsSet);
        return true;
    }
    static addDocument(name, text, label) {
        const instance = this.classifiers.get(name);
        if (!instance)
            return false;
        instance.classifier.addDocument(text, label);
        if (!instance.labels.includes(label)) {
            instance.labels.push(label);
        }
        instance.trained = false;
        instance.trainingDataCount++;
        return true;
    }
    static retrain(name) {
        const instance = this.classifiers.get(name);
        if (!instance)
            return false;
        instance.classifier.train();
        instance.trained = true;
        instance.lastTrained = new Date();
        return true;
    }
    static classify(name, text) {
        const instance = this.classifiers.get(name);
        if (!instance || !instance.trained)
            return null;
        const classifications = instance.classifier.getClassifications(text);
        if (classifications.length === 0) {
            return {
                label: "",
                probability: 0,
                allProbabilities: {},
            };
        }
        const best = classifications[0];
        const allProbabilities = {};
        for (const classification of classifications) {
            allProbabilities[classification.label] = classification.value;
        }
        return {
            label: best.label,
            probability: best.value,
            allProbabilities,
        };
    }
    static getClassifications(name, text) {
        const instance = this.classifiers.get(name);
        if (!instance || !instance.trained)
            return null;
        return instance.classifier.getClassifications(text);
    }
    static getClassProbability(name, text, label) {
        const classifications = this.getClassifications(name, text);
        if (!classifications)
            return null;
        const classification = classifications.find((c) => c.label === label);
        return classification ? classification.value : 0;
    }
    static async saveClassifier(name, filePath) {
        const instance = this.classifiers.get(name);
        if (!instance || !instance.trained)
            return false;
        try {
            const fs = await Promise.resolve().then(() => __importStar(require("fs/promises")));
            const serialized = JSON.stringify(instance.classifier);
            await fs.writeFile(filePath, serialized, "utf-8");
            return true;
        }
        catch (error) {
            console.error(`Failed to save classifier ${name}:`, error);
            return false;
        }
    }
    static async loadClassifier(name, filePath) {
        try {
            const fs = await Promise.resolve().then(() => __importStar(require("fs/promises")));
            const data = await fs.readFile(filePath, "utf-8");
            const parsed = JSON.parse(data);
            const classifier = natural_1.BayesClassifier.restore(parsed);
            this.classifiers.set(name, {
                classifier,
                name,
                trained: true,
                trainingDataCount: 0,
                lastTrained: new Date(),
                labels: [],
            });
            return true;
        }
        catch (error) {
            console.error(`Failed to load classifier ${name}:`, error);
            return false;
        }
    }
    static reset(name) {
        const instance = this.classifiers.get(name);
        if (!instance)
            return false;
        instance.classifier = new natural_1.BayesClassifier();
        instance.trained = false;
        instance.trainingDataCount = 0;
        instance.lastTrained = null;
        instance.labels = [];
        return true;
    }
    static getStatistics() {
        const stats = {};
        for (const [name, instance] of this.classifiers) {
            stats[name] = {
                trained: instance.trained,
                trainingDataCount: instance.trainingDataCount,
                lastTrained: instance.lastTrained,
            };
        }
        return stats;
    }
    static getLabels(name) {
        const instance = this.classifiers.get(name);
        if (!instance || !instance.trained)
            return null;
        return instance.labels;
    }
    static getClassifier(name) {
        const instance = this.classifiers.get(name);
        return instance ? instance.classifier : null;
    }
}
exports.BayesClassifierManager = BayesClassifierManager;
//# sourceMappingURL=BayesClassifierManager.js.map
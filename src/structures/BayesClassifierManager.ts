import { BayesClassifier } from "natural"

export interface TrainingData {
  text: string | string[]
  label: string
  features?: Record<string, number>
}

export interface ClassificationResult {
  label: string
  probability: number
  allProbabilities: Record<string, number>
}

export interface ClassifierInstance {
  classifier: BayesClassifier
  name: string
  trained: boolean
  trainingDataCount: number
  lastTrained: Date | null
}

export class BayesClassifierManager {
  private static classifiers = new Map<string, ClassifierInstance>()

  /**
   * Create a new Bayes classifier instance
   */
  static create(name: string): boolean {
    if (this.classifiers.has(name)) {
      return false // Already exists
    }

    const classifier = new BayesClassifier()
    this.classifiers.set(name, {
      classifier,
      name,
      trained: false,
      trainingDataCount: 0,
      lastTrained: null,
    })

    return true
  }

  /**
   * Delete a classifier instance
   */
  static delete(name: string): boolean {
    return this.classifiers.delete(name)
  }

  /**
   * Check if a classifier exists
   */
  static exists(name: string): boolean {
    return this.classifiers.has(name)
  }

  /**
   * Get all classifier names
   */
  static getAllNames(): string[] {
    return Array.from(this.classifiers.keys())
  }

  /**
   * Get classifier information
   */
  static getInfo(name: string): ClassifierInstance | null {
    const instance = this.classifiers.get(name)
    if (!instance) return null

    return {
      ...instance,
      classifier: instance.classifier, // Return a copy of the info without the actual classifier
    }
  }

  /**
   * Train a classifier with labeled training data
   */
  static train(name: string, data: TrainingData[]): boolean {
    const instance = this.classifiers.get(name)
    if (!instance) return false

    // Reset the classifier
    instance.classifier = new BayesClassifier()

    let totalDocuments = 0

    // Add training documents
    for (const item of data) {
      const texts = Array.isArray(item.text) ? item.text : [item.text]
      for (const text of texts) {
        instance.classifier.addDocument(text, item.label)
        totalDocuments++
      }
    }

    // Train the classifier
    instance.classifier.train()
    instance.trained = true
    instance.trainingDataCount = totalDocuments
    instance.lastTrained = new Date()

    return true
  }

  /**
   * Add a single training document to an existing classifier
   */
  static addDocument(name: string, text: string, label: string): boolean {
    const instance = this.classifiers.get(name)
    if (!instance) return false

    instance.classifier.addDocument(text, label)
    instance.trained = false // Mark as needing retraining
    instance.trainingDataCount++
    return true
  }

  /**
   * Retrain a classifier after adding documents
   */
  static retrain(name: string): boolean {
    const instance = this.classifiers.get(name)
    if (!instance) return false

    instance.classifier.train()
    instance.trained = true
    instance.lastTrained = new Date()
    return true
  }

  /**
   * Classify a new text sample
   */
  static classify(name: string, text: string): ClassificationResult | null {
    const instance = this.classifiers.get(name)
    if (!instance || !instance.trained) return null

    const classifications = instance.classifier.getClassifications(text)

    if (classifications.length === 0) {
      return {
        label: "",
        probability: 0,
        allProbabilities: {},
      }
    }

    // Get the best classification
    const best = classifications[0]
    const allProbabilities: Record<string, number> = {}

    for (const classification of classifications) {
      allProbabilities[classification.label] = classification.value
    }

    return {
      label: best.label,
      probability: best.value,
      allProbabilities,
    }
  }

  /**
   * Get all classifications for a text (with probabilities)
   */
  static getClassifications(name: string, text: string): Array<{ label: string; value: number }> | null {
    const instance = this.classifiers.get(name)
    if (!instance || !instance.trained) return null

    return instance.classifier.getClassifications(text)
  }

  /**
   * Get the probability of a specific class for a text
   */
  static getClassProbability(name: string, text: string, label: string): number | null {
    const classifications = this.getClassifications(name, text)
    if (!classifications) return null

    const classification = classifications.find((c) => c.label === label)
    return classification ? classification.value : 0
  }

  /**
   * Save a trained classifier to a JSON file
   */
  static async saveClassifier(name: string, filePath: string): Promise<boolean> {
    const instance = this.classifiers.get(name)
    if (!instance || !instance.trained) return false

    try {
      const fs = await import("fs/promises")
      const serialized = JSON.stringify(instance.classifier)
      await fs.writeFile(filePath, serialized, "utf-8")
      return true
    } catch (error) {
      console.error(`Failed to save classifier ${name}:`, error)
      return false
    }
  }

  /**
   * Load a classifier from a JSON file
   */
  static async loadClassifier(name: string, filePath: string): Promise<boolean> {
    try {
      const fs = await import("fs/promises")
      const data = await fs.readFile(filePath, "utf-8")
      const parsed = JSON.parse(data)
      const classifier = BayesClassifier.restore(parsed)

      this.classifiers.set(name, {
        classifier,
        name,
        trained: true,
        trainingDataCount: 0, // We don't know the original count
        lastTrained: new Date(),
      })

      return true
    } catch (error) {
      console.error(`Failed to load classifier ${name}:`, error)
      return false
    }
  }

  /**
   * Reset a classifier (clear all training data)
   */
  static reset(name: string): boolean {
    const instance = this.classifiers.get(name)
    if (!instance) return false

    instance.classifier = new BayesClassifier()
    instance.trained = false
    instance.trainingDataCount = 0
    instance.lastTrained = null
    return true
  }

  /**
   * Get statistics about all classifiers
   */
  static getStatistics(): Record<
    string,
    {
      trained: boolean
      trainingDataCount: number
      lastTrained: Date | null
    }
  > {
    const stats: Record<
      string,
      {
        trained: boolean
        trainingDataCount: number
        lastTrained: Date | null
      }
    > = {}

    for (const [name, instance] of this.classifiers) {
      stats[name] = {
        trained: instance.trained,
        trainingDataCount: instance.trainingDataCount,
        lastTrained: instance.lastTrained,
      }
    }

    return stats
  }

  /**
   * Get the underlying natural BayesClassifier instance (for advanced usage)
   */
  static getClassifier(name: string): BayesClassifier | null {
    const instance = this.classifiers.get(name)
    return instance ? instance.classifier : null
  }
}

# ForgeNLP

A lightweight ForgeScript extension for the Node.js 'natural' library,
providing natural language processing functions.

## Installation

### From GitHub (recommended)

```bash
npm install github:weebforge/ForgeNLP
```

### For dev version

```bash
npm install github:weebforge/ForgeNLP#dev
```

## Setup

Here is a small setup
with an example code.

```ts
const { ForgeNLP } = require("@weebforge/nlp");

const client = new ForgeClient({
  extensions: [
    new ForgeNLP({
      loadDefaults: true,
      classifiers: [
        {
          name: "sentiment",
          trainingData: [
            { label: "positive", text: "I love this!" },
            { label: "negative", text: "This sucks" }
          ]
        }
      ]
    })
  ]
});

client.commands.addCommand({
  name: "classify",
  type: "messageCreate",
  code: `$classifyText[sentiment;$message]`
});
```

## Features

- **Tokenization**: Word, sentence, and custom tokenizers
- **String Distance**: Levenshtein, Jaro-Winkler, and more
- **Word Management**: Load and query word datasets
- **Bayes Classifiers**: Train and use text classifiers
- **Distance Functions**: Multiple string comparison algorithms

## Support

If you need any assistance, don't hesitate to reach out by opening a
support form in the official BotForge Discord server! :D

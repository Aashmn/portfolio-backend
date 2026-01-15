try {
  const { OpenAI } = require('openai');
  console.log('OpenAI package installed and imported successfully');

  const { OpenAIEmbedding } = require('llamaindex/embedding');
  console.log('LlamaIndex OpenAIEmbedding imported successfully');

  const { VectorStoreIndex } = require('llamaindex/index/vector');
  console.log('LlamaIndex VectorStoreIndex imported successfully');

  const { Document } = require('llamaindex/document');
  console.log('LlamaIndex Document imported successfully');
} catch (error) {
  console.error('Error importing packages:', error.message);
}

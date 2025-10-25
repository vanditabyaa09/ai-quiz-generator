const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

class GeminiService {
  constructor() {
    this.model = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async processText(text) {
    try {
      const summary = await this.generateSummary(text);
      const keyPoints = await this.generateKeyPoints(text);
      const mcqs = await this.generateMCQs(text);

      return {
        summary,
        keyPoints: this.parseKeyPoints(keyPoints),
        mcqs: this.parseMCQs(mcqs)
      };
    } catch (error) {
      console.error('Error processing text with Gemini:', error);
      throw new Error('Failed to process text with AI');
    }
  }

  async callModel(prompt) {
    const response = await this.model.invoke(prompt);
    return response.content;
  }

  async generateSummary(text) {
    const prompt = `Summarize the following text in a concise but comprehensive manner:\n\n${text}`;
    return this.callModel(prompt);
  }

  async generateKeyPoints(text) {
    const prompt = `Extract 5-8 key points from the following text as a numbered list:\n\n${text}`;
    return this.callModel(prompt);
  }

  async generateMCQs(text) {
    const prompt = `Create 5 multiple-choice questions based on the following text. For each question, provide 4 options (A-D) and clearly indicate the correct one.\n\n${text}`;
    return this.callModel(prompt);
  }

  parseKeyPoints(keyPointsText) {
    return keyPointsText
      .split('\n')
      .filter(line => /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
  }

  parseMCQs(mcqsText) {
    const mcqBlocks = mcqsText.split(/Q\d+\./).filter(block => block.trim() !== '');

    return mcqBlocks.map(block => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      const questionText = lines[0]?.trim();
      const options = [];
      lines.slice(1, 5).forEach(line => {
        const match = line.match(/^([A-D])\.?\s*(.+)$/);
        if (match) options.push(match[2].trim());
      });
      const correct = lines.find(l => /correct answer/i.test(l));
      const correctAnswer = correct?.match(/([A-D])/i)?.[1]?.toUpperCase() || '';

      return { question: questionText, options, correctAnswer };
    });
  }
}

module.exports = new GeminiService();
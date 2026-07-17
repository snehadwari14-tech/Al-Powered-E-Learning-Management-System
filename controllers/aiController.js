const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// AI Tutor
const askTutor = async (req, res) => {
  try {
    const { question } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI tutor. Explain concepts in simple English using short paragraphs. Do not use markdown symbols, headings, bullet points, numbering, or code blocks. Return clean text suitable for direct display on a website."
          },
          {
            role: "user",
            content: question,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    res.status(200).json({
      answer:
        chatCompletion.choices[0]
          .message.content,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Generate Summary
const generateSummary =
  async (req, res) => {
    try {

      const { text } = req.body;

      const chatCompletion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Summarize the given content in simple English. Use short paragraphs. Avoid markdown symbols, bullet points, numbering, headings, and code blocks."
            },
            {
              role: "user",
              content: text,
            },
          ],

          model:
            "llama-3.3-70b-versatile",
        });

      res.status(200).json({
        summary:
          chatCompletion.choices[0]
            .message.content,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

// Generate Quiz
const generateQuiz =
  async (req, res) => {
    try {

      const {
        topic,
        numberOfQuestions,
      } = req.body;

      const prompt = `
Generate ${numberOfQuestions} multiple choice questions on ${topic}.

Requirements:
- Each question should have exactly 4 options (A, B, C, D).
- Mention the correct answer below each question.
- Return plain text only.
- No markdown symbols or code blocks.
`;

      const chatCompletion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are an expert quiz generator. Generate clear MCQ questions in plain text."
            },
            {
              role: "user",
              content: prompt,
            },
          ],

          model:
            "llama-3.3-70b-versatile",
        });

      res.status(200).json({
        quiz:
          chatCompletion.choices[0]
            .message.content,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {
  askTutor,
  generateSummary,
  generateQuiz,
};
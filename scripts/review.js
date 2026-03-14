const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runReview() {
  const diff = fs.readFileSync("pr.diff", "utf8");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const result = await model.generateContent(`
You are a senior Flutter developer reviewing a pull request.

Analyze the following code changes and provide:

- Issues
- Suggestions
- Flutter best practices

Code changes:
${diff}
`);

  const review = result.response.text();

  fs.writeFileSync("review.txt", review);
}

runReview();

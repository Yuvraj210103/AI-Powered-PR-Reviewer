const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runReview() {
  const diff = fs.readFileSync("pr.diff", "utf8");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(`
You are a senior software engineer reviewing a pull request.

Review this code change:

${diff}

Provide issues, suggestions and improvements.
`);

  const review = result.response.text();

  fs.writeFileSync("review.txt", review);
}

runReview();

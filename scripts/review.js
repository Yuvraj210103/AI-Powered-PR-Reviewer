const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runReview() {
  const prData = JSON.parse(fs.readFileSync("pr_files.json", "utf8"));

  let combinedCode = "";

  for (const file of prData) {
    if (!file.patch) continue;

    const filePath = file.filename;

    let fileContent = "";

    try {
      fileContent = fs.readFileSync(filePath, "utf8");
    } catch (e) {
      continue;
    }

    combinedCode += `
===============================
FILE: ${filePath}

FULL FILE CODE:
${fileContent}

DIFF CHANGES:
${file.patch}
===============================
`;
  }

  const prompt = `
You are a senior software engineer reviewing a pull request.

Below are files changed in a PR.

For each file you will see:
1) Full file code
2) Diff of changes

Review the code and provide:

- Issues
- Suggestions
- Performance improvements
- Security concerns
- Best practices

Format response like:

## AI Code Review

### Issues
(list)

### Suggestions
(list)

### Overall Score
(score out of 10)
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: combinedCode },
    ],
  });

  const review = response.choices[0].message.content;

  fs.writeFileSync("review.txt", review);
}

runReview();

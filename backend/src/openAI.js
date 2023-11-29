const OpenAI = require('openai');
require('dotenv').config()



// @ts-ignore
const openai = new OpenAI({ apiKey: process.env.openAIKey });

async function AI() {
  const completion = await openai.chat.completions.create({
    messages: [
      {role: 'system', content: 'You are a technical recruiter design to output JSON.'},
      {role: 'user', content: 'Can you get me a software engineering job?' }
    ],
    model: 'gpt-3.5-turbo-1106',
    response_format: { "type": "json_object" },
  });

  console.log(completion.choices[0].message.content);
}

AI();

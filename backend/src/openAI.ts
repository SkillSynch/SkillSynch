// const OpenAI = require('openai');
// require('dotenv').config()


// // list of techs a software engineer should know. Each tuple should contain only one tech
// // years of experience should be a number
// // location should be a US state

// // @ts-ignore
// const openai = new OpenAI({ apiKey: process.env.openAIKey });

// async function AI() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {role: 'system', content: 'You are a technical recruiter design to output JSON.'},
//       // {role: 'user', content: `Given the following job description, please respond in the following JSON format {techs: [array of tuple with two elements, name of the tech and minimum years of experience required], estimatedSalary: array of tuples with three elements, the location, the minimum estimated salary and the maximum estimated salary, level: choose between junior, mid, and senior}. If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }. Here is the job description: ${'jobDescription'}` } // need to get this job description from the database.
//       {role: 'user', content: `Given the following job description, please respond in the following JSON format {techs: [array of tuple with two elements, name of a single technology (do not combine multiple technologies, include only software technologies) and the estimated level of experience required (choose from junior, mid, senior)], estimatedSalary: array of tuples with three elements, the state of the location, the minimum estimated salary and the maximum estimated salary, level: choose between junior, mid, and senior}. If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }. Here is the job description: ${'jobDescription'}` } // need to get this job description from the database.
//     ],
//     model: 'gpt-3.5-turbo-1106',
//     response_format: { "type": "json_object" },
//   });

//   console.log(completion.choices[0].message.content);
// }

// AI();
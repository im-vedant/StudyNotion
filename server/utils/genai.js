const {GoogleGenerativeAI} =require('@google/generative-ai')
require('dotenv').config()
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports=model
const {GoogleGenerativeAI} =require('@google/generative-ai')

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDR0obQM1ez-07nxNAIvjG4Qe5Fc7kFNMU");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports=model
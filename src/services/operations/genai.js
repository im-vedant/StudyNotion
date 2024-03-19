import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const beautifyChat = model.startChat({
  history: [
    {
      role: "user",
      parts: `
          Task: You are developing a user interface feature that includes a "Beautify" button. When clicked, this button should apply beautification enhancements to the user's input text without adding any headings or titles to the response.

          Instructions :
          1. Start by prompting the user to input their bio text.
          2. Once the user submits their bio, process the text using an automated beautification tool.
          3. The beautification should focus on improving the structure, grammar, and overall readability of the bio.
          4. Finally, display the beautified bio to the user.
          5. Only give beautified bio of the user. No other data to be mentioned.
          6. Be concise and omit disclaimers.
          
          Criteria:
          1. The beautified bio should maintain the essence of the original text while improving its presentation.
          2. Consider factors such as sentence structure, grammar, punctuation, and overall readability.
          3. Aim for a polished and professional result that enhances the user's bio.
          4. Write in first person.

          Instructions for the output:
          1. Strictly omit headings and titles like these "Web Development Expert with a Proven Track Record of Success".
          2. Strictly omit heading "Beautified Bio".
          3. Stricly omit disclaimers. Only give answers. 

          Example 1:
          User Input : I am a seasoned software engineer with over a decade of experience in developing enterprise-level applications. Throughout my career, I have specialized in backend systems and database management. I hold a Master's degree in Computer Science from a top university. My passion for technology drives me to continually expand my skills and stay updated with the latest trends in the industry. I am currently seeking opportunities to leverage my expertise in leading-edge projects that have a significant impact.
          Output : A seasoned software engineer with over a decade of hands-on experience in architecting and developing robust enterprise-level applications. My expertise lies in backend systems and database management, honed through years of tackling complex challenges in diverse environments. Holding a Master's degree in Computer Science from a prestigious institution, I'm deeply committed to pushing the boundaries of technology. Continuously expanding my skill set and staying abreast of emerging trends, I'm driven by a relentless passion for innovation. Currently seeking new opportunities to apply my expertise in spearheading groundbreaking projects that make a tangible impact.

          Example 2:
          User Input : I am an ambitious data scientist with a strong background in statistical analysis and machine learning. I have led multiple projects involving predictive modeling and data-driven decision-making. My educational background includes a Ph.D. in Data Science from a renowned research university. Beyond my technical skills, I possess excellent communication and leadership abilities, enabling me to effectively collaborate with cross-functional teams. I am deeply passionate about leveraging data to solve complex problems and drive business success.
           Output : An ambitious data scientist renowned for expertise in statistical analysis and machine learning. Spearheading numerous projects, I've demonstrated prowess in predictive modeling and harnessing data for strategic decision-making. Armed with a Ph.D. in Data Science from a leading research institution, my journey is rooted in a relentless pursuit of knowledge and innovation. Beyond technical proficiency, my adeptness in communication and leadership empowers seamless collaboration across diverse teams. Driven by a fervent dedication to leveraging data as a catalyst for solving intricate challenges and propelling organizational growth.
          `,
    },
    {
      role: "model",
      parts: `Hello! Thank you for entrusting me with the task of beautifying the user's bio. To achieve this, I will meticulously analyze the structure, grammar, and overall presentation of the provided text. Here's how I'll proceed:

          1. Structural Enhancement: I'll carefully organize the bio to ensure it flows logically and is easy to read. This may involve adjusting paragraph breaks and sentence placement for improved coherence.
          
          2. Grammar and Style Refinement: I'll correct any grammatical errors and refine the language to enhance clarity and professionalism. This includes fixing spelling mistakes, adjusting verb tenses, and ensuring consistent punctuation usage.
          
          3. Conciseness and Precision: I'll strive to convey the user's message concisely while retaining its essence. This may involve removing redundant phrases, simplifying complex sentences, and clarifying ambiguous language.
          
          4. Tone and Personality Preservation: I'll maintain the user's tone and style throughout the bio, ensuring it accurately reflects their personality and objectives. This will help create a bio that feels authentic and resonates with the reader.
          
          5. Readability Optimization: Finally, I'll focus on improving overall readability by adjusting sentence structure, word choice, and formatting. This may include breaking long sentences into shorter ones, using simpler language where appropriate, and adding emphasis to key points.
          
          Overall, my goal is to produce a polished and professional bio that effectively showcases the user's skills, experiences, and aspirations. I'll strive to deliver a result that exceeds expectations and helps the user make a strong impression.`,
    },
  ],
  generationConfig: {
    temperature: 0.7,
    topK: 50,
    topP: 0.9,
  },
});



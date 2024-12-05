import OpenAI from 'openai';
import type { Analysis, AnalysisRequest } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeResume({ resumeText, jobDescription }: AnalysisRequest): Promise<Analysis> {
  const prompt = `
    Analyze this resume against the job description:
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Provide a detailed analysis including:
    1. Match score (0-100)
    2. Matching keywords found
    3. Important keywords missing
    4. Specific suggestions for improvement
    5. An improved version of the resume content
    
    Format as JSON with these keys: matchScore, keywordMatches, missingKeywords, suggestions, improvedContent
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert ATS system and resume analyzer. Provide detailed, actionable feedback to help candidates improve their resumes."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content) as Analysis;
}
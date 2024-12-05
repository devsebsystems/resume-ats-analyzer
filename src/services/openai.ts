import OpenAI from 'openai';
import type { Analysis, AnalysisRequest } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeResume({ resumeText, jobDescription }: AnalysisRequest): Promise<Analysis> {
  const prompt = `
    Analyze this resume against the job description and provide improvements while preserving the entire original content.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Provide a comprehensive analysis in JSON format with the following structure:
    {
      "matchScore": number (0-100),
      "keywordMatches": string[],
      "missingKeywords": string[],
      "suggestions": string[],
      "improvedContent": {
        "original": "full original resume text",
        "improved": "complete improved version with all enhancements",
        "improvements": [
          {
            "section": "section name (e.g., 'Experience', 'Skills')",
            "changes": [
              "Specific improvement made in this section"
            ]
          }
        ]
      }
    }

    Important guidelines:
    1. Preserve ALL original content - don't remove anything
    2. Keep the same structure and format as the original
    3. Add relevant keywords and phrases naturally within the existing content
    4. Enhance impact statements and metrics
    5. Improve clarity and formatting while maintaining the complete resume
    6. Track all improvements made in each section
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are an expert ATS system and resume analyzer. Your task is to:
        1. Preserve the entire original resume while making improvements
        2. Enhance the content without removing any information
        3. Add relevant keywords and strengthen impact statements naturally
        4. Provide detailed tracking of all improvements made
        5. Ensure the improved version maintains professional authenticity`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4000
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content received from OpenAI');
  }

  return JSON.parse(content) as Analysis;
}
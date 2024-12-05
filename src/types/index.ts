export interface Analysis {
  matchScore: number;
  keywordMatches: string[];
  missingKeywords: string[];
  suggestions: string[];
  improvedContent?: string;
}

export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
}
export interface Analysis {
  matchScore: number;
  keywordMatches: string[];
  missingKeywords: string[];
  suggestions: string[];
  improvedContent: {
    original: string;
    improved: string;
    improvements: {
      section: string;
      changes: string[];
    }[];
  };
}

export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
}
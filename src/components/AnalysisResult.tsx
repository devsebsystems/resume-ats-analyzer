import ReactMarkdown from 'react-markdown';
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import type { Analysis } from '../types';

interface AnalysisResultProps {
  analysis: Analysis;
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Score Circle */}
      <div className="flex items-start gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex-1">
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-4xl font-bold ${getScoreColor(analysis.matchScore)}`}>
                  {analysis.matchScore}
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={getScoreBackground(analysis.matchScore)}
                  strokeWidth="3"
                  strokeDasharray={`${analysis.matchScore}, 100`}
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Keep improving!</h2>
              <p className="text-gray-600">
                Keep making recommended updates to your resume to reach a score of 80% or more.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Keywords */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <CheckCircle className="mr-2 text-green-500" />
            Matching Keywords ({analysis.keywordMatches.length})
          </h2>
          <ul className="space-y-2">
            {analysis.keywordMatches.map((keyword, index) => (
              <li key={index} className="flex items-center text-green-700 bg-green-50 px-3 py-2 rounded">
                <span className="mr-2">•</span>
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Keywords */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <XCircle className="mr-2 text-red-500" />
            Missing Keywords ({analysis.missingKeywords.length})
          </h2>
          <ul className="space-y-2">
            {analysis.missingKeywords.map((keyword, index) => (
              <li key={index} className="flex items-center text-red-700 bg-red-50 px-3 py-2 rounded">
                <span className="mr-2">•</span>
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="flex items-center text-lg font-semibold mb-4">
          <AlertCircle className="mr-2 text-blue-500" />
          Suggestions for Improvement
        </h2>
        <ul className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start bg-blue-50 p-4 rounded">
              <span className="mr-3 mt-1 text-blue-500">•</span>
              <ReactMarkdown className="prose prose-blue">{suggestion}</ReactMarkdown>
            </li>
          ))}
        </ul>
      </div>

      {/* Improved Content */}
      {analysis.improvedContent && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-lg font-semibold mb-4">
            <TrendingUp className="mr-2 text-green-500" />
            Improved Resume Content
          </h2>
          <div className="prose max-w-none bg-green-50 p-4 rounded">
            <ReactMarkdown>{analysis.improvedContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
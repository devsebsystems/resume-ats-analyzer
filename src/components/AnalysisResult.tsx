import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Download, Eye } from 'lucide-react';
import type { Analysis } from '../types';

interface AnalysisResultProps {
  analysis: Analysis;
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const hardSkillsTotal = analysis.keywordMatches.length + analysis.missingKeywords.length;
  const matchedPercentage = (analysis.keywordMatches.length / hardSkillsTotal) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid gap-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Resume Analysis</h1>
              <p className="text-blue-100">Match Score Analysis & Recommendations</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
                <Eye size={18} />
                Preview
              </button>
              <button className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg">
                {analysis.matchScore}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Match Score</h2>
                <p className="text-gray-500">Overall Compatibility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Skills Match</span>
                  <span className="text-sm font-medium text-blue-600">{matchedPercentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${matchedPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Missing Keywords Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700 border border-amber-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recruiter Tips
            </h3>
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-green-50 text-green-700 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improved Content Preview */}
        {analysis.improvedContent && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Improved Content Preview
            </h3>

            {/* Improvements Summary */}
            <div className="mb-6 space-y-4">
              <h4 className="font-medium text-gray-700">Improvements Made:</h4>
              {analysis.improvedContent.improvements.map((improvement, idx) => (
                <div key={idx} className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-blue-700 mb-2">{improvement.section}</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {improvement.changes.map((change, changeIdx) => (
                      <li key={changeIdx} className="text-sm text-blue-600">{change}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Side by Side Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Original Resume</h4>
                <pre className="bg-gray-50 p-4 rounded-xl overflow-auto text-sm font-mono text-gray-700 border border-gray-200 h-[500px]">
                  {analysis.improvedContent.original}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Improved Resume</h4>
                <pre className="bg-gray-50 p-4 rounded-xl overflow-auto text-sm font-mono text-gray-700 border border-gray-200 h-[500px]">
                  {analysis.improvedContent.improved}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
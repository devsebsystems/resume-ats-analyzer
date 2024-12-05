import React, { useState, useEffect, useCallback } from 'react';
import { Scan } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeResume } from './services/openai';
import type { Analysis } from './types';
import debounce from 'lodash/debounce';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  const performAnalysis = useCallback(
    debounce(async (resume: string, job: string) => {
      if (!resume || !job) return;

      setLoading(true);
      try {
        const result = await analyzeResume({ resumeText: resume, jobDescription: job });
        setAnalysis(result);
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (resumeText && jobDescription) {
      performAnalysis(resumeText, jobDescription);
    }
  }, [resumeText, jobDescription, performAnalysis]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Scan className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">AI Resume Scanner</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
            <FileUpload onFileContent={setResumeText} label="resume" />
            {resumeText && (
              <div className="mt-4">
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full h-48 p-4 border rounded-lg"
                  placeholder="Resume content..."
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Job Description</h2>
            <FileUpload onFileContent={setJobDescription} label="job description" />
            {jobDescription && (
              <div className="mt-4">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-48 p-4 border rounded-lg"
                  placeholder="Job description..."
                />
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing your resume...</p>
          </div>
        )}

        {analysis && !loading && (
          <AnalysisResult analysis={analysis} />
        )}
      </main>
    </div>
  );
}

export default App;
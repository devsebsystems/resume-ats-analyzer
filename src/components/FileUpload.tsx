import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import * as PDFJS from 'pdfjs-dist';

// Initialize PDF.js worker
PDFJS.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

interface FileUploadProps {
  onFileContent: (content: string) => void;
  label: string;
}

export function FileUpload({ onFileContent, label }: FileUploadProps) {
  const getPageText = async (pdf: PDFJS.PDFDocumentProxy, pageNo: number): Promise<string> => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    return tokenizedText.items.map(token => token.str).join(' ');
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
      const maxPages = pdf.numPages;
      const pageTextPromises = [];

      for (let pageNo = 1; pageNo <= maxPages; pageNo++) {
        pageTextPromises.push(getPageText(pdf, pageNo));
      }

      const pageTexts = await Promise.all(pageTextPromises);
      return pageTexts.join(' ');
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      let text: string;

      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        text = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsText(file);
        });
      } else {
        throw new Error('Unsupported file type');
      }

      if (!text.trim()) {
        throw new Error('No text content found in file');
      }

      onFileContent(text);
    } catch (error) {
      console.error('File processing error:', error);
      alert(error instanceof Error ? error.message : 'Error processing file. Please try again.');
    }
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop the file here"
          : `Drag and drop your ${label}, or click to select`}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Supported formats: PDF, TXT
      </p>
    </div>
  );
}